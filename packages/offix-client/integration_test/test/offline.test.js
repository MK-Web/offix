import { createClient } from '../../dist'
import { createOptimisticResponse, CacheOperation } from 'offix-cache';
import { TestStore } from '../utils/testStore';
import { ToggleableNetworkStatus } from '../utils/network';
import server from '../utils/server';
import waitFor from '../utils/waitFor';
import timeout from '../utils/timeout';
import { ADD_TASK, GET_TASKS, UPDATE_TASK, DELETE_TASK } from '../utils/graphql.queries';

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

// TODO: error handling when server is down

const newNetworkStatus = (online = true) => {
  const networkStatus = new ToggleableNetworkStatus();
  networkStatus.setOnline(online);
  return networkStatus;
};

const offlineMetaKey = "offline-meta-data";

const newClient = async (clientOptions = {}) => {
  const config = {
    httpUrl: "http://localhost:4000/graphql",
    wsUrl: "ws://localhost:4000/graphql",
    ...clientOptions
  };

  return await createClient(config);
};

describe('Offline mutations', function () {

  this.timeout(20000);

  const mutationsQueueName = 'offline-mutation-queue';

  const newTask = {
    description: 'new',
    title: 'new',
    version: 1,
    author: "new"
  };

  const optimisticOptions = {
    mutation: ADD_TASK,
    operationType: CacheOperation.ADD,
    returnType: "Task",
    variables: newTask,
    updateQuery: GET_TASKS
  };

  const updatedTask = {
    description: 'updated',
    title: 'updated'
  };

  let client, networkStatus, store;

  before('start server', async function () {
    await server.start();
  });

  after('stop server', async function () {
    await server.stop();
  });

  beforeEach('reset server', async function () {
    await server.reset();
  });

  beforeEach('create client', async function () {
    networkStatus = newNetworkStatus(false);
    store = new TestStore();
    client = await newClient({ networkStatus, storage: store, mutationsQueueName });
  });

  async function isQueueEmpty() {
    const store = await store.getItem(offlineMetaKey);
    return store.length === 0
  }

  describe('offline mutations', function () {

    // it('mutations are queued when offline', async function () {
    //   // debugger
    //   const mutationOptions = {
    //     mutation: ADD_TASK,
    //     variables: newTask
    //   }
    //   await client.offlineMutation(mutationOptions).catch(err => { });
    //   // debugger
    //   const queue = client.queue.queue
    //   expect(queue.length).to.equal(1)
    //   // debugger
    //   const op = queue[0].operation.op
    //   expect(op.mutation).to.deep.equal(mutationOptions.mutation)
    //   expect(op.variables).to.deep.equal(mutationOptions.variables)
    // });

    it('mutations are persisted while offline', async function () {
      const mutationOptions = {
        mutation: ADD_TASK,
        variables: newTask
      }
      debugger;
      await client.offlineMutation(mutationOptions).catch(err => {
        console.log(err)
        debugger
      })

      const store = client.queue.store
      debugger
      const storeData = await store.getOfflineData()

      expect(storeData.length).to.equal(1);
      debugger
      const op = storeData[0].operation.op
      expect(op.mutation).to.deep.equal(mutationOptions.mutation)
      expect(op.variables).to.deep.equal(mutationOptions.variables)
    });

    // it('offlineMutate throws an offline error, we can get result when coming back online', function (done) {
    //   client.offlineMutation({
    //     mutation: ADD_TASK,
    //     variables: newTask
    //   }).catch((err) => {
    //     const promise = err.offlineMutationPromise
    //     networkStatus.setOnline(true);  // go online
    //     promise.then((response) => {
    //       console.log('offline changes replicated', response)
    //       expect(response.data.createTask).to.exist;
    //       expect(response.data.createTask.title).to.equal(newTask.title);
    //       expect(response.data.createTask.description).to.equal(newTask.description);
    //       done()
    //     })
    //   })
    // });

    // it('queues multiple mutations while offline', async function () {
    //   networkStatus.setOnline(true);

    //   const response = await client.offlineMutation({
    //     mutation: ADD_TASK,
    //     variables: newTask
    //   });

    //   let task = response.data.createTask;

    //   networkStatus.setOnline(false);

    //   const variables = { ...updatedTask, id: task.id, version: task.version };
    //   try {
    //     await client.offlineMutation({
    //       mutation: UPDATE_TASK,
    //       variables
    //     });
    //   } catch (ignore) { }

    //   try {
    //     await client.offlineMutation({
    //       mutation: DELETE_TASK,
    //       variables: { id: task.id }
    //     });
    //   } catch (ignore) { }

    //   const queue = client.queue.queue
    //   expect(queue.length).to.equal(2)
    //   expect(queue[0].operation.op.context.operationName).to.equal('updateTask');
    //   expect(queue[1].operation.op.context.operationName).to.equal('deleteTask');
    // });

    // it('Handles multiple mutations on the same object in queue/store', async function () {
    //   networkStatus.setOnline(true);

    //   const result = await client.mutate({
    //     mutation: ADD_TASK,
    //     variables: newTask
    //   })

    //   networkStatus.setOnline(false);

    //   const task = result.data.createTask;
    //   const variables = { ...task, ...updatedTask };

    //   try {
    //     await client.offlineMutation({
    //       mutation: UPDATE_TASK,
    //       variables
    //     });
    //   } catch (ignore) { }
    //   try {
    //     await client.offlineMutation({
    //       mutation: DELETE_TASK,
    //       variables: { id: task.id }
    //     });
    //   } catch (ignore) { }

    //   networkStatus.setOnline(true);

    //   await new Promise(resolve => setTimeout(resolve, 300));

    //   const response = await client.query({
    //     query: GET_TASKS,
    //     fetchPolicy: 'network-only'
    //   });

    //   expect(response.data.allTasks).to.exist;
    //   expect(response.data.allTasks.length).to.equal(0);
    // });

    // it('can create new items and subsequently mutate them while offline, async function ()', async () => {
    //   let task;
    //   const optimisticResponse = createOptimisticResponse(optimisticOptions)
    //   try {
    //     await client.offlineMutation({
    //       mutation: ADD_TASK,
    //       variables: newTask,
    //       optimisticResponse,
    //       update: (_, { data: { createTask } }) => task = createTask
    //     })
    //   } catch (ignore) { }

    //   const variables = { ...updatedTask, id: task.id, version: task.version };
    //   try {
    //     await client.offlineMutation({
    //       mutation: UPDATE_TASK,
    //       variables
    //     });

    //   } catch (ignore) { }
    //   networkStatus.setOnline(true);

    //   await new Promise(resolve => setTimeout(resolve, 300));

    //   const response = await client.query({
    //     query: GET_TASKS,
    //     fetchPolicy: 'network-only'
    //   })
    //   expect(response.data.allTasks).to.exist;
    //   expect(response.data.allTasks.length).to.equal(1);
    //   expect(response.data.allTasks[0].title).to.equal(updatedTask.title);
    // });

    it('reinitialized client will replay operations from the offline storage (simulates an app restart)', async function () {
      let task;
      try {
        await client.offlineMutation({
          mutation: ADD_TASK,
          variables: newTask,
          optimisticResponse: createOptimisticResponse(optimisticOptions),
          update: (_, { data: { createTask } }) => task = createTask
        });
      } catch (ignore) { }

      const variables = { ...updatedTask, id: task.id, version: task.version };
      try {
        await client.offlineMutation({
          mutation: UPDATE_TASK,
          variables
        });
      } catch (ignore) { }

      networkStatus = newNetworkStatus();
      client = await newClient({ networkStatus, storage: store, mutationsQueueName });

      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await client.query({
        query: GET_TASKS,
        fetchPolicy: 'network-only'
      });

      expect(response.data.allTasks).to.exist;
      expect(response.data.allTasks.length).to.equal(1);
      expect(response.data.allTasks[0].title).to.equal(updatedTask.title);
    });

    // it('it can handle multiple offline mutations on an existing object and replay them successfully', async function () {
    //   networkStatus.setOnline(true);

    //   const result = await client.offlineMutation({
    //     mutation: ADD_TASK,
    //     variables: newTask,
    //     returnType: "Task",
    //     optimisticResponse: createOptimisticResponse(optimisticOptions),
    //   });

    //   let task = result.data.createTask;

    //   networkStatus.setOnline(false);

    //   try {
    //     await client.offlineMutation({
    //       mutation: UPDATE_TASK,
    //       returnType: 'Task',
    //       variables: { title: 'update1', description: 'merge', id: task.id, version: task.version }
    //     });
    //   } catch (err) { }

    //   try {
    //     await client.offlineMutation({
    //       mutation: UPDATE_TASK,
    //       returnType: 'Task',
    //       variables: { title: 'update2', description: 'merge', id: task.id, version: task.version }
    //     });
    //   } catch (err) { }

    //   networkStatus.setOnline(true);

    //   await timeout(1000);

    //   const response = await client.query({
    //     query: GET_TASKS,
    //     fetchPolicy: 'network-only'
    //   });

    //   expect(response.data.allTasks).to.exist;
    //   expect(response.data.allTasks.length).to.equal(1);
    //   expect(response.data.allTasks[0].title).to.equal('update2');
    // });


  });

  // describe('do not merge offline mutations', function () {

  //   let task;

  //   beforeEach('prepare data', async function () {
  //     client = await newClient({ networkStatus, storage: store, mutationsQueueName });
  //     networkStatus.setOnline(true);

  //     const response = await client.offlineMutation({
  //       mutation: ADD_TASK,
  //       variables: newTask,
  //       optimisticResponse: createOptimisticResponse(optimisticOptions),
  //     });

  //     task = response.data.createTask;

  //     networkStatus.setOnline(false);
  //   });

  //   it('should succeed', async function () {
  //     const variables = { title: 'nomerge1', description: 'nomerge', id: task.id, version: task.version };
  //     try {
  //       await client.offlineMutation({
  //         mutation: UPDATE_TASK,
  //         returnType: "Task",
  //         variables
  //       });
  //     } catch (ignore) { }

  //     variables.title = 'nomerge2';
  //     try {
  //       await client.offlineMutation({
  //         mutation: UPDATE_TASK,
  //         returnType: "Task",
  //         variables
  //       });
  //     } catch (ignore) { }

  //     const offlineKeys = await store.getItem(offlineMetaKey);
  //     const offlineMutation1 = await store.getItem("offline:" + offlineKeys[0]);
  //     const offlineMutation2 = await store.getItem("offline:" + offlineKeys[1]);

  //     expect(offlineMutation1).to.exist;
  //     expect(offlineMutation2).to.exist;
  //     expect(offlineMutation1.variables.title).to.equal('nomerge1');
  //     expect(offlineMutation2.variables.title).to.equal(variables.title);

  //     networkStatus.setOnline(true);

  //     await waitFor(() => isQueueEmpty, 100);
  //     await timeout(100);

  //     const response = await client.query({
  //       query: GET_TASKS,
  //       fetchPolicy: 'network-only'
  //     });

  //     expect(response.data.allTasks).to.exist;
  //     expect(response.data.allTasks.length).to.equal(1);
  //     expect(response.data.allTasks[0].title).to.equal(variables.title);
  //   });
  // });

  // describe('ensure offline params are added to offline object ', function () {

  //   let task;

  //   beforeEach('prepare data', async function () {
  //     client = await newClient({ networkStatus, storage: store, mutationsQueueName });
  //     networkStatus.setOnline(true);

  //     const response = await client.offlineMutation({
  //       mutation: ADD_TASK,
  //       variables: newTask,
  //       optimisticResponse: createOptimisticResponse(optimisticOptions),
  //     });

  //     task = response.data.createTask;

  //     networkStatus.setOnline(false);
  //   });

  //   it('should succeed', async function () {
  //     const variables = { title: 'nomerge1', description: 'nomerge', id: task.id, version: task.version };
  //     try {
  //       await client.offlineMutation({
  //         mutation: UPDATE_TASK,
  //         returnType: "Task",
  //         variables,
  //         idField: "someOtherField",
  //         returnType: "ADifferentType"
  //       });
  //     } catch (ignore) { }


  //     const offlineKeys = await store.getItem(offlineMetaKey);
  //     const offlineMutation1 = await store.getItem("offline:" + offlineKeys[0]);

  //     expect(offlineMutation1).to.exist;
  //     expect(offlineMutation1.returnType).to.equal('ADifferentType');
  //     expect(offlineMutation1.idField).to.equal('someOtherField');

  //   });
  // });

  // describe('notify about offline changes', function () {
  //   it('should succeed', async function () {
  //     let offlineOps = 0;
  //     let cleared = 0;

  //     const listener = {
  //       onOperationEnqueued: () => offlineOps++,
  //       queueCleared: () => cleared++
  //     };

  //     client = await newClient({ networkStatus, storage: store, mutationsQueueName, offlineQueueListener: listener });
  //     try {
  //       await client.offlineMutation({
  //         mutation: ADD_TASK,
  //         variables: newTask
  //       });
  //     } catch (ignore) { }

  //     expect(offlineOps).to.equal(1);

  //     networkStatus.setOnline(true);

  //     await new Promise(resolve => setTimeout(resolve, 300));

  //     expect(cleared).to.equal(1);
  //   });
  // });
});


