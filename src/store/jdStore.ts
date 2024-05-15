import { atom } from "recoil";

export const detailStore = atom<number>({
  key: "detailId",
  default: 0,
});
