import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DynamicDataState {
  [key: string]: unknown
}

const initialState: DynamicDataState = {}

const persistGlobslDataSlice = createSlice({
  name: "dynamicData",
  initialState,
  reducers: {
    setGlobalData: (
      state,
      action: PayloadAction<{
        key: string
        data: unknown
      }>,
    ) => {
      state[action.payload.key] = action.payload.data
    },
    removeGlobalData: (state, action: PayloadAction<{ key: string }>) => {
      delete state[action.payload.key]
    },
    clearGlobalData: (state, action: PayloadAction<{ key: string }>) => {
      state[action.payload.key] = null
    },
  },
})

export const { setGlobalData, removeGlobalData, clearGlobalData } =
  persistGlobslDataSlice.actions

export default persistGlobslDataSlice.reducer
