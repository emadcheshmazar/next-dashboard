export const storageKeys = {
  token: "t",
  userData: "ud",
} as const

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys]

