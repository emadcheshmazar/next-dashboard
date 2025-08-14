import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AllElement,
  ElementStore,
  ElementTypes,
} from "../../components/elements/models"

const initialState: ElementStore<ElementTypes> = {}

const elementSlice = createSlice({
  name: "persistElements",
  initialState,
  reducers: {
    initElement: (
      state,
      action: PayloadAction<{ config: AllElement<ElementTypes> }>,
    ) => {
      const { config } = action.payload
      const { name } = config
      state[name] = config
      console.log(state, "initElement")
    },
    changeState: (
      state,
      action: PayloadAction<{ newConfig: AllElement<ElementTypes> }>,
    ) => {
      const { newConfig } = action.payload
      const { name } = newConfig
      state[name] = { ...newConfig }
    },
    removeElement: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload
      delete state[name]
    },
    removeElements: (state) => {
      Object.keys(state).forEach((key) => {
        delete state[key]
      })
    },
  },
})

export const { initElement, changeState, removeElements, removeElement } =
  elementSlice.actions

export default elementSlice.reducer
