import { changeState, removeElement } from "../redux/slices/elementsSlice";
import {
  changeState as changePersistState,
  removeElement as removePersistElement,
} from "../redux/slices/persistElementsSlice";
import AppReduxStore from "../redux/store";

export const collectFormValues = (args: {
  formName: string;
  isPersist?: boolean;
}) => {
  const state = args.isPersist
    ? AppReduxStore.getState().withPersist.persistElements
    : AppReduxStore.getState().withoutPersist.elements;

  const formValues = {} as { [key: string]: unknown };
  for (const key in state) {
    const element = state[key];
    if (element && element.formName === args.formName) {
      const keyForSave = element.name4Save || element.name;
      formValues[keyForSave] = element.value;
    }
  }
  return formValues;
};

export const collectAllFormValues = (args: { formName: string }) => {
  const stateWithoutPersist = AppReduxStore.getState().withoutPersist.elements;
  const stateWithPersist = AppReduxStore.getState().withPersist.persistElements;

  const formValues = {} as { [key: string]: unknown };
  const combinedState = { ...stateWithPersist, ...stateWithoutPersist };

  for (const key in combinedState) {
    const element = combinedState[key];
    if (element && element.formName === args.formName) {
      const keyForSave = element.name4Save || element.name;
      formValues[keyForSave] = element.value;
    }
  }

  return formValues;
};

export const clearFormValues = (args: {
  formName: string;
  isPersist?: boolean;
}) => {
  const { formName, isPersist = false } = args;
  const state = isPersist
    ? AppReduxStore.getState().withPersist.persistElements
    : AppReduxStore.getState().withoutPersist.elements;
  Object.values(state).forEach((el) => {
    if (el.formName === formName) {
      const newConfig = { ...el, value: undefined };
      AppReduxStore.dispatch(
        isPersist
          ? changePersistState({ newConfig })
          : changeState({ newConfig })
      );
    }
  });
};

export const removeFormElements = (formName: string, isPersist = false) => {
  const state = isPersist
    ? AppReduxStore.getState().withPersist.persistElements
    : AppReduxStore.getState().withoutPersist.elements;
  Object.entries(state).forEach(([name, el]) => {
    if (el.formName === formName) {
      AppReduxStore.dispatch(
        isPersist ? removePersistElement({ name }) : removeElement({ name })
      );
    }
  });
};
