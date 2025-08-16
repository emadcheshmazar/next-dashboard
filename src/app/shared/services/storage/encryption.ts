import CryptoJS from "crypto-js";
export const encrypt = (data: unknown) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "emad-shinobi-no-coder"
  ).toString();
export const decrypt = (txt: string) => {
  if (!txt) return null;
  const bytes = CryptoJS.AES.decrypt(txt, "emad-shinobi-no-coder");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
