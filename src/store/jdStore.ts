import { atom } from "recoil";

export const detailStore = atom<string | number>({
  key: "detailId",
  default: 0,
});
