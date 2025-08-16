import { useSyncExternalStore } from "react";
import AppReduxStore from "@/app/shared/redux/store";
import { getLogs, getLogStates } from "../../core/logs.helpers";

export const useLogsStates = () => {
  return useSyncExternalStore(
    AppReduxStore.subscribe,
    () => getLogs(),
    () => getLogs()
  );
};

export const useLogStates = () => {
  return useSyncExternalStore(
    AppReduxStore.subscribe,
    () => getLogStates(),
    () => getLogStates()
  );
};
