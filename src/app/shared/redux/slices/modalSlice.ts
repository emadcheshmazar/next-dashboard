import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ModalState } from "../../components/composite/Dialog/models"

const initialState: ModalState = {}

interface OpenModalPayload {
  modalName: string
  modalProps?: undefined
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    createModal: (state, action: PayloadAction<string>) => {
      const modalName = action.payload
      if (!state[modalName]) {
        state[modalName] = { open: false, modalProps: null }
      }
    },
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      const { modalName, modalProps } = action.payload
      if (!state[modalName]) {
        state[modalName] = { open: true, modalProps: modalProps || null }
      } else {
        state[modalName].open = true
        state[modalName].modalProps = modalProps || null
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modalName = action.payload
      if (state[modalName]) {
        state[modalName].open = false
      }
    },
    deleteModal: (state, action: PayloadAction<string>) => {
      const modalName = action.payload
      if (state[modalName]) {
        delete state[modalName]
      }
    },
  },
})

export const { createModal, openModal, closeModal, deleteModal } =
  modalSlice.actions
export default modalSlice.reducer
