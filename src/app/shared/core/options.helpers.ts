import AppReduxStore from "../redux/store";
import { ElementTypes, itemOption } from "../components/elements/models";
import { changeState } from "../redux/slices/elementsSlice";
import { changeState as changePersistState } from "../redux/slices/persistElementsSlice";

export const addElementOptions = <T extends ElementTypes>(args: {
  name: string;
  options: T extends ElementTypes.Select ? itemOption[] : never;
  isPersist?: boolean;
}) => {
  const { name, options, isPersist = false } = args;

  const state = isPersist
    ? AppReduxStore.getState().withPersist.persistElements[name]
    : AppReduxStore.getState().withoutPersist.elements[name];

  if (state && state.type === ElementTypes.Select && "options" in state) {
    const currentOptions = state.options as itemOption[];
    const newOptions = [...currentOptions, ...options];
    const newConfig = { ...state, options: newOptions };

    AppReduxStore.dispatch(
      isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
    );
  }
};

export const removeElementOptions = <T extends ElementTypes>(args: {
  name: string;
  optionsToRemove: T extends
    | ElementTypes.Select
    | ElementTypes.Radiobox
    ? itemOption[]
    : never;
}) => {
  const { name, optionsToRemove } = args;
  const state = AppReduxStore.getState().withoutPersist.elements[name];
  if (!state) return;

  if ("options" in state) {
    const newConfig = {
      ...state,
      options: (state.options as itemOption[])?.filter(
        (option: itemOption) =>
          !optionsToRemove.some(
            (optionToRemove) => optionToRemove.value === option.value
          )
      ),
    };

    AppReduxStore.dispatch(changeState({ newConfig }));
  }
};

export const clearElementOptions = (args: {
  name: string;
  isPersist?: boolean;
}) => {
  const { name, isPersist = false } = args;

  const state = isPersist
    ? AppReduxStore.getState().withPersist.persistElements[name]
    : AppReduxStore.getState().withoutPersist.elements[name];

  if (!state || !("options" in state)) return;

  const newConfig = { ...state, options: [] };

  AppReduxStore.dispatch(
    isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};
