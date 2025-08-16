import { ElementTypes, AllElement } from "../components/elements/models";
import { changeState, removeElements } from "../redux/slices/elementsSlice";
import {
  changeState as changePersistState,
  removeElements as removePersistElements,
} from "../redux/slices/persistElementsSlice";
import AppReduxStore from "../redux/store";

export const findElementByFormName = (args: {
  formName: string;
  name: string;
  isPersist?: boolean;
}) => {
  const { formName, name, isPersist = false } = args;
  const state = isPersist
    ? AppReduxStore.getState().withPersist.persistElements
    : AppReduxStore.getState().withoutPersist.elements;
  return Object.values(state).find(
    (el) => el.formName === formName && el.name === name
  );
};

export const setElementValue = (args: {
  formName: string;
  name: string;
  value: unknown;
  isPersist?: boolean;
}) => {
  const { value, isPersist } = args;
  const element = findElementByFormName(args);
  if (!element) {
    console.warn(
      `Element with formName "${args.formName}" and name "${args.name}" not found`
    );
    return;
  }
  const newConfig = { ...element, value } as typeof element;
  AppReduxStore.dispatch(
    isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};

export const getElementValue = <T extends ElementTypes>(args: {
  formName: string;
  name: string;
  isPersist?: boolean;
}): AllElement<T>["value"] => {
  const element = findElementByFormName(args) as AllElement<T> | undefined;
  return element?.value;
};

export const setElementDisable = (args: {
  formName: string;
  name: string;
  disable: boolean;
  isPersist?: boolean;
}) => {
  const { disable, isPersist } = args;
  const element = findElementByFormName(args);
  if (!element) return;
  const newConfig = { ...element, disable } as typeof element;
  AppReduxStore.dispatch(
    isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};

export const setElementError = (args: {
  formName: string;
  name: string;
  error: boolean;
  isPersist?: boolean;
}) => {
  const { error, isPersist } = args;
  const element = findElementByFormName(args);
  if (!element) return;
  const newConfig = { ...element, error } as typeof element;
  AppReduxStore.dispatch(
    isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};

export const addElementHelperText = (args: {
  formName: string;
  name: string;
  helperText: string;
  isPersist?: boolean;
}) => {
  const { helperText, isPersist } = args;
  const element = findElementByFormName(args);
  if (!element) return;
  const newConfig = { ...element, helperText } as typeof element;
  AppReduxStore.dispatch(
    isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};
export const removeElementHelperText = (args: {
  formName: string;
  name: string;
  isPersist?: boolean;
}) => {
  const element = findElementByFormName(args);
  if (!element) return;
  const newConfig = { ...element, helperText: "" } as typeof element;
  AppReduxStore.dispatch(
    args.isPersist ? changePersistState({ newConfig }) : changeState({ newConfig })
  );
};

export const removeAllElements = (isPersist: boolean) => {
  AppReduxStore.dispatch(
    isPersist ? removePersistElements() : removeElements()
  );
};
