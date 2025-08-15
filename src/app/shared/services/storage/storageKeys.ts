export const storageKeys = {
  token: "t",
  currentUserData: "cud",
  userList: "ul",
  //   const USERS_KEY = "users";
  // const CURRENT_USER_KEY = "currentUser";
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];
