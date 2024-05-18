import { atom } from "recoil";

// interface userInfo {
//     name: "",
//     token: "",
// }

export interface UserDataType {
  name: string;
  provider: string;
  token: string;
}

export const userInfo = atom<UserDataType>({
  key: "userInfo",
  default: {
    name: "",
    provider: "",
    token: "",
  },
});
