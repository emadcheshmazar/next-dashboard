import { useSyncExternalStore } from "react";
import AppReduxStore from "@/app/shared/redux/store";
import { getLogs } from "../../core/logs.helpers";

export const useLogsStates = () => {
  return useSyncExternalStore(
    AppReduxStore.subscribe,
    () => getLogs(),
    () => getLogs()
  );
};
