import { atom } from "recoil";

// interface userInfo {
//     name: "",
//     token: "",
// }

export const userInfo = atom<object>({
  key: "userInfo",
  default: {},
});
