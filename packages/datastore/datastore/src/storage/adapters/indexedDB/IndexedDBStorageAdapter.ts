import { StorageAdapter } from "../../api/StorageAdapter";
import { createLogger } from "../../../utils/logger";
import { ModelSchema } from "../../../ModelSchema";
import { Filter } from "../../../filters";
import { getPredicate } from "./Predicate";

const logger = createLogger("idb");

/**
 * Web Storage Implementation for DataStore using IndexedDB
 */
export class IndexedDBStorageAdapter implements StorageAdapter {
  public indexedDB: Promise<IDBDatabase>;
  private stores: ModelSchema[];
  private resolveIDB: any;
  private rejectIDB: any;
  private transaction?: IDBTransaction;
  private dbName: string;
  private schemaVersion: number;

  constructor(dbName: string, schemaVersion: number, transaction?: IDBTransaction, stores: ModelSchema[] = []) {
    this.dbName = dbName;
    this.schemaVersion = schemaVersion;
    this.indexedDB = new Promise((resolve, reject) => {
      this.resolveIDB = resolve;
      this.rejectIDB = reject;
    });
    this.transaction = transaction;
    this.stores = stores;
  }
  public addStore(config: ModelSchema) {
    this.stores.push(config);
  }

  public createStores() {
    logger("Creating stores", this.dbName, this.schemaVersion);
    const openreq = window.indexedDB.open(this.dbName, this.schemaVersion);
    openreq.onerror = () => this.rejectIDB(openreq.error);
    openreq.onsuccess = () => {
      const db = openreq.result;
      db.onversionchange = function() {
        // FIXME critical to handle version changes
        this.close();
      };
      this.resolveIDB(db);
    };

    openreq.onupgradeneeded = () => {
      const db = openreq.result;
      const existingStoreNames = db.objectStoreNames;

      db.onerror = (event: any) => {
        logger("error", event);
      };

      for (let i = 0; i < existingStoreNames.length; i++) {
        const storeName = (existingStoreNames.item(i) as string);
        const existingModelStoreName = this.stores.find(((store) => (storeName === store.getStoreName())));
        if (existingModelStoreName) { return; }

        // model has been removed, remove it's store
        db.deleteObjectStore(storeName);
      }

      this.stores.forEach((store) => {
        if (existingStoreNames.contains(store.getName())) { return; }
        logger("Creating store", store.getStoreName());
        const id = store.getPrimaryKey();
        db.createObjectStore(store.getStoreName(), { keyPath: id });
      });
    };
  }

  public async createTransaction() {
    const db = await this.indexedDB;
    const transaction = db.transaction((db.objectStoreNames as unknown as string[]), "readwrite");
    return new IndexedDBStorageAdapter(this.dbName, this.schemaVersion, transaction, this.stores);
  }

  public commit() {
    return new Promise<void>((resolve, reject) => {
      if (!this.transaction) {
        reject(new Error("Transaction is not open"));
        return;
      }

      this.transaction.onerror = (ev) => { reject(this.transaction?.error); };
      this.transaction.oncomplete = () => { resolve(); };
    });
  }

  public rollback() {
    return new Promise<void>((resolve, reject) => {
      if (!this.transaction) {
        reject(new Error("Transaction is not open"));
        return;
      }

      this.transaction.onabort = () => { resolve(); };
      this.transaction.abort();
    });
  }

  public isTransactionOpen() {
    return (this.transaction !== undefined);
  }

  public async save(storeName: string, input: any) {
    const store = await this.getStore(storeName);
    await this.convertToPromise<IDBValidKey>(store.add(input));
    return input;
  }

  public async query(storeName: string, filter?: Filter): Promise<any[]> {
    const store = await this.getStore(storeName);
    const cursorReq = store.openCursor();
    const result: any[] = [];

    return new Promise((resolve, reject) => {
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          if (!filter) {
            result.push(cursor.value);
          } else {
            const predicate = getPredicate(filter);
            if (predicate(cursor.value)) {
              result.push(cursor.value);
            }
          }
          cursor.continue();
        } else {
          resolve(result);
        }
      };

      cursorReq.onerror = () => reject(cursorReq.error);
    });
  }

  public async queryById(storeName: string, idField: string, id: string) {
    const store = await this.getStore(storeName);
    return this.convertToPromise<any>(store.get(id));
  }

  public async update(storeName: string, input: any, filter?: Filter) {
    const targets = await this.query(storeName, filter);
    const store = await this.getStore(storeName);

    const promises = targets.map((data) => this.convertToPromise<IDBValidKey>(
      store.put({ ...data, ...input }))
    );
    await Promise.all(promises);
    // TODO redundant query to the DB.
    return this.query(storeName, filter);
  }

  public async updateById(storeName: string, idField: string, input: any) {
    const store = await this.getStore(storeName);
    const id = input[idField];
    const target = await this.convertToPromise<any>(store.get(id));
    if (!target) { throw new Error(`${id} was not found`); }

    const data = { ...target, ...input, [idField]: target[idField] };
    await this.convertToPromise<IDBValidKey>(store.put(data));
    return data;
  }

  public async saveOrUpdate(storeName: string, idField: string, input: any) {
    const store = await this.getStore(storeName);
    let target;

    if (input[idField]) {
      target = await this.convertToPromise<any>(store.get(input[idField]));
    }
    if (!target) {
      // input doesn't exist, create it
      const saveData = input;
      await this.convertToPromise(store.put(saveData));
      return saveData;
    }
    // input exists, update it
    const updateData = { ...target, ...input };
    await this.convertToPromise(store.put(updateData));
    return updateData;
  }

  public async remove(storeName: string, idField: string, filter?: Filter) {
    // TODO provide ability to delete from store by key (not fetching entire store which is innefficient)
    // detect if predicate is id or create separate method
    const targets = await this.query(storeName, filter);
    const store = await this.getStore(storeName);
    await Promise.all(
      targets.map((t: any) => this.convertToPromise(store.delete(t[idField])))
    );
    return targets;
  }

  public async deleteStore(storeName: string): Promise<any> {
    const store = await this.getStore(storeName);
    return this.convertToPromise(store.clear());
  }

  public async removeById(storeName: string, idField: string, input: any) {
    const store = await this.getStore(storeName);
    const target = await this.convertToPromise(store.get(input[idField]));
    await this.convertToPromise(store.delete(input[idField]));
    return target;
  }

  public getIndexedDBInstance() {
    return this.indexedDB;
  }

  private async getStore(storeName: string) {
    if (this.transaction) {
      return this.transaction.objectStore(storeName);
    }
    const db = await this.indexedDB;
    return db.transaction(storeName, "readwrite")
      .objectStore(storeName);
  }

  private convertToPromise<T>(request: IDBRequest) {
    return new Promise<T>((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(request.error);
      };
    });
  }
}
