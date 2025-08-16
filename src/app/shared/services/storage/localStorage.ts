// storage.ts
import { decrypt, encrypt } from "./encryption";

// Minimal, fast deep clone with modern fallback
export const deepClone = <T>(val: T): T => {
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(val);
  }
  // Fallback (loses functions/Map/Set, fine for plain JSON data we store)
  return JSON.parse(JSON.stringify(val)) as T;
};

export const storeData = (args: { key: string; data: unknown }) => {
  try {
    // ensure callers can't mutate the original reference after calling
    const safe = deepClone(args.data);
    localStorage.setItem(args.key, encrypt(safe));
  } catch (err) {
    console.error("error in storing Data", err);
  }
};

export const getData = <T = unknown>(arg: { key: string }): T | null => {
  try {
    const data = localStorage.getItem(arg.key);
    if (!data) return null;
    const parsed = decrypt(data) as T;
    // hand out a fresh deep copy so external mutations never affect what's stored
    return deepClone(parsed);
  } catch (err) {
    console.error("Error in get storage:", err);
    return null;
  }
};

export const clearData = (arg: { key: string }) => {
  try {
    localStorage.removeItem(arg.key);
  } catch (err) {
    console.error("Error in clearing storage:", err);
  }
};

export const clearAllData = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Error in clearing all storage:", err);
  }
};
