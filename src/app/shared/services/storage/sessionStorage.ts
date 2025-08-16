import { decrypt, encrypt } from "./encryption"
export const storeData = (args: { key: string; data: unknown }) => {
  try {
    sessionStorage.setItem(args.key, encrypt(args.data))
  } catch (err) {
    console.log("error in storing Data", err)
  }
}
export const getData = (arg: { key: string }) => {
  try {
    const data = sessionStorage.getItem(arg.key)
    if (!data) return null
    return decrypt(data)
  } catch (err) {
    console.error("Error in get storage:", err)
    return null
  }
}
export const clearData = (arg: { key: string }) => {
  try {
    sessionStorage.removeItem(arg.key)
  } catch (err) {
    console.error("Error in clearing storage:", err)
  }
}

export const clearAllData = () => {
  try {
    sessionStorage.clear()
  } catch (err) {
    console.error("Error in clearing all storage:", err)
  }
}
