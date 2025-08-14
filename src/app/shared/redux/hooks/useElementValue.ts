import { useSyncExternalStore } from "react";
import AppReduxStore from "@/app/shared/redux/store";
import { getElementValue } from "@/app/shared/core";

export const useElementValue = (args: {
  formName: string;
  name: string;
  isPersist?: boolean;
}) => {
  return useSyncExternalStore(
    AppReduxStore.subscribe,
    () =>
      getElementValue({
        formName: args.formName,
        name: args.name,
        isPersist: args.isPersist,
      }),
    () =>
      getElementValue({
        formName: args.formName,
        name: args.name,
        isPersist: args.isPersist,
      })
  );
};
