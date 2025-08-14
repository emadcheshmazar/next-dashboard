import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToastInterface, ToastState } from "../../components/composite/Toast/models"

const initialState: ToastState = {
  toasts: [],
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<Omit<ToastInterface, "id"> & { id: string }>,
    ) => {
      const actions = action.payload.actions?.slice(0, 3)

      state.toasts.push({
        ...action.payload,
        showDefaultIcon: action.payload.showDefaultIcon ?? true,
        duration: action.payload.duration ?? 5000,
        actions: actions,
      })
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
    clearToasts(state) {
      state.toasts = []
    },
  },
})

export const { addToast, removeToast, clearToasts } = toastSlice.actions
export default toastSlice.reducer
