import { decrypt, encrypt } from "./encryption"
export const storeData = (args: { key: string; data: unknown }) => {
  try {
    localStorage.setItem(args.key, encrypt(args.data))
  } catch (err) {
    console.log("error in storing Data", err)
  }
}
export const getData = (arg: { key: string }): unknown => {
  try {
    const data = localStorage.getItem(arg.key)
    if (!data) return null
    return decrypt(data)
  } catch (err) {
    console.error("Error in get storage:", err)
    return null
  }
}
export const clearData = (arg: { key: string }) => {
  try {
    localStorage.removeItem(arg.key)
  } catch (err) {
    console.error("Error in clearing storage:", err)
  }
}

export const clearAllData = () => {
  try {
    localStorage.clear()
  } catch (err) {
    console.error("Error in clearing all storage:", err)
  }
}
