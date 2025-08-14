import AppReduxStore from "../redux/store";
import {
  createModal,
  openModal,
  closeModal,
  deleteModal,
} from "../redux/slices/modalSlice";

export const getModal = (arg: { modalName: string }) => {
  const state = AppReduxStore.getState().withoutPersist.modal[arg.modalName];
  return state ?? undefined;
};

export const getModalProps = (arg: { modalName: string }) => {
  return getModal(arg)?.modalProps;
};

export const hasModal = (arg: { modalName: string }): boolean => {
  return !!getModal(arg);
};

export const removeModal = (arg: { modalName: string }) => {
  if (hasModal(arg)) {
    AppReduxStore.dispatch(deleteModal(arg.modalName));
  }
};

export const toggleModal = (args: {
  modalName: string;
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps?: any;
}) => {
  const { modalName, open, modalProps } = args;

  if (!hasModal({ modalName })) {
    AppReduxStore.dispatch(createModal(modalName));
  }

  if (open) {
    AppReduxStore.dispatch(openModal({ modalName, modalProps }));
  } else {
    AppReduxStore.dispatch(closeModal(modalName));
  }
};
