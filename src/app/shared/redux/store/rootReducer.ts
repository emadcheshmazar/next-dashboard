import { combineReducers } from "redux"
import modalReducer from "../slices/modalSlice"
import elementSlice from "../slices/elementsSlice"
import persistElementsSlice from "../slices/persistElementsSlice"
import sidebarReducer from "../slices/sidebarSlice"
import toastReducer from "../slices/toastSlice"
import globalDataReducer from "../slices/globalDataSlice"
import persistGlobalDataReducer from "../slices/persistGlobslDataSlice"

const withoutPersist = combineReducers({
  modal: modalReducer,
  elements: elementSlice,
  sidebar: sidebarReducer,
  toast: toastReducer,
  globalData: globalDataReducer,
})
const withPersist = combineReducers({
  persistElements: persistElementsSlice,
  persistData: persistGlobalDataReducer,
})

const sliceRootReducer = {
  withPersist,
  withoutPersist,
}

export default sliceRootReducer
