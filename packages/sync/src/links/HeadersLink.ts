import { ApolloLink, NextLink, Operation } from "apollo-link";
import { setContext } from "apollo-link-context";
import { DataSyncConfig } from "../config/DataSyncConfig";

export const createHeadersLink = (config: DataSyncConfig): ApolloLink => {
  const asyncHeadersLink = setContext(async (operation, previousContext) => {
    if (config.authContextProvider) {
      const { header } = await config.authContextProvider();
      return {
        headers: header
      };
    }
  });
  return asyncHeadersLink;
};