import {
  storeData as storeSessionData,
  getData as getSessionData,
  clearData as clearSessionStorage,
  clearAllData as clearAllSessionStorage,
} from "./sessionStorage"

import {
  storeData as storeLocalData,
  getData as getLocalData,
  clearData as clearLocalStorage,
  clearAllData as clearAllLocalStorage,
} from "./localStorage"

import {
  storeData as storeCookieData,
  getData as getCookieData,
  clearData as clearCookieStorage,
  clearAllData as clearAllCookieStorage,
} from "./cookie"

export {
  storeSessionData,
  getSessionData,
  clearSessionStorage,
  clearAllSessionStorage,
  storeLocalData,
  getLocalData,
  clearLocalStorage,
  clearAllLocalStorage,
  storeCookieData,
  getCookieData,
  clearCookieStorage,
  clearAllCookieStorage,
}
