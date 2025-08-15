import { removeFormElements, showToast } from "../../core";
import ROUTES from "../../routes";
import { clearData, getData, storeData } from "../storage/localStorage";
import { storageKeys } from "../storage/storageKeys";

export interface User {
  email: string;
  password: string;
}

export const fakeApiCall = <T>(callback: () => T, delay = 1000): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(callback()), delay));

export const registerUser = async (user: User) => {
  showToast({ title: "در حال ثبت نام...", variant: "info", duration: 1000 });

  await fakeApiCall(() => {
    const users = (getData({ key: storageKeys.userList }) as User[]) || [];

    if (users.find((u) => u.email === user.email)) {
      showToast({
        title: "این ایمیل قبلا ثبت شده",
        variant: "error",
        duration: 2000,
      });
      return;
    }

    const updatedUsers = [...users, user];
    storeData({ key: storageKeys.userList, data: updatedUsers });
    // storeData({ key: storageKeys.currentUserData, data: user });

    showToast({
      title: "ثبت نام موفق",
      variant: "success",
      duration: 1500,
    });

    setTimeout(() => {
    //   removeFormElements("auth");
      window.location.href = ROUTES.AUTH.LOGIN;
    }, 1000);
  });
};

export const loginUser = async (user: User) => {
  showToast({ title: "در حال ورود...", variant: "info", duration: 1000 });

  await fakeApiCall(() => {
    const users = (getData({ key: storageKeys.userList }) as User[]) || [];

    const foundUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (!foundUser) {
      showToast({
        title: "ایمیل یا رمز عبور اشتباه یا ثبت نام نشده",
        variant: "error",
        duration: 2000,
      });
      return;
    }

    storeData({ key: storageKeys.currentUserData, data: foundUser });

    showToast({
      title: "ورود موفق",
      variant: "success",
      duration: 1500,
    });

    setTimeout(() => {
      removeFormElements("auth");
      window.location.href = ROUTES.DASHBOARD.USERS.ROOT;
    }, 1000);
  });
};

export const getCurrentUser = (): User | null => {
  return getData({ key: storageKeys.currentUserData }) as User | null;
};

export const logoutUser = async () => {
  await fakeApiCall(() => {
    clearData({ key: storageKeys.currentUserData });
  });

  showToast({
    title: "خروج موفق",
    variant: "info",
    duration: 1500,
  });

  setTimeout(() => {
    window.location.href = ROUTES.AUTH.LOGIN;
  }, 1000);
};
