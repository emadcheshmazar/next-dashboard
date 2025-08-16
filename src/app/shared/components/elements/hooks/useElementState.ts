import { initElement as initElementNormal } from "@/app/shared/redux/slices/elementsSlice";
import { initElement as initElementPersist } from "@/app/shared/redux/slices/persistElementsSlice";
import { AllElement, ElementStore, ElementTypes } from "../models";
import AppReduxStore, { useAppSelector } from "@/app/shared/redux/store";

const useInitElement = <T extends ElementTypes>(args: {
  config: AllElement<T>;
  isPersist?: boolean;
}) => {
  const { config, isPersist = false } = args;
  const { name, defaultValue } = config;

  const getState = (elements: ElementStore<T>) => {
    if (elements[name]) return elements[name];

    const finalConfig =
      defaultValue !== undefined ? { ...config, value: defaultValue } : config;

    const dispatcher = isPersist ? initElementPersist : initElementNormal;
    AppReduxStore.dispatch(dispatcher({ config: finalConfig }));
    return finalConfig;
  };

  const elementState = useAppSelector((state) =>
    isPersist
      ? getState(state.withPersist.persistElements)
      : getState(state.withoutPersist.elements)
  );

  return elementState;
};

export default useInitElement;
