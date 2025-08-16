import { combineReducers } from "redux";
import elementSlice from "../slices/elementsSlice";
import persistElementsSlice from "../slices/persistElementsSlice";
import sidebarReducer from "../slices/sidebarSlice";
import toastReducer from "../slices/toastSlice";
import logsDataReducer from "../slices/logsSlice";

const withoutPersist = combineReducers({
  elements: elementSlice,
  sidebar: sidebarReducer,
  toast: toastReducer,
});
const withPersist = combineReducers({
  persistElements: persistElementsSlice,
  logsData: logsDataReducer,
});

const sliceRootReducer = {
  withPersist,
  withoutPersist,
};

export default sliceRootReducer;
