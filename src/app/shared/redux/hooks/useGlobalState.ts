import { useAppDispatch, useAppSelector } from "../store";
import {
  setGlobalData,
  removeGlobalData,
  clearGlobalData,
} from "../slices/globalDataSlice";
import {
  setGlobalData as setPersistGlobalData,
  removeGlobalData as removePersistGlobalData,
  clearGlobalData as clearPersistGlobalData,
} from "../slices/persistGlobslDataSlice";

export function useGlobalState<T = unknown>({
  key,
  isPersist,
}: {
  key: string;
  isPersist?: boolean;
}) {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    isPersist
      ? state.withPersist.persistData[key]
      : state.withoutPersist.globalData[key]
  ) as T | undefined;

  const set = (value: T) => {
    if (isPersist) {
      dispatch(setPersistGlobalData({ key, data: value }));
    } else {
      dispatch(setGlobalData({ key, data: value }));
    }
  };

  const remove = () => {
    if (isPersist) {
      dispatch(removePersistGlobalData({ key }));
    } else {
      dispatch(removeGlobalData({ key }));
    }
  };

  const clear = () => {
    if (isPersist) {
      dispatch(clearPersistGlobalData({ key }));
    } else {
      dispatch(clearGlobalData({ key }));
    }
  };

  return {
    data,
    set,
    remove,
    clear,
  };
}
