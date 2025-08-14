import AppReduxStore from "../redux/store";
import { addToast, removeToast, clearToasts } from "../redux/slices/toastSlice";
import { ToastInterface } from "../components/composite/Toast/models";

export const showToast = (
  args: Omit<ToastInterface, "id"> & { id?: string }
) => {
  const toastId =
    args.id ||
    `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  AppReduxStore.dispatch(addToast({ ...args, id: toastId }));
  return toastId;
};

export const hideToast = (id: string) => {
  AppReduxStore.dispatch(removeToast(id));
};

export const hideAllToasts = () => {
  AppReduxStore.dispatch(clearToasts());
};

export const getToasts = (): ToastInterface[] => {
  return AppReduxStore.getState().withoutPersist.toast.toasts;
};

export const getToastById = (id: string): ToastInterface | undefined => {
  return getToasts().find((toast) => toast.id === id);
};
