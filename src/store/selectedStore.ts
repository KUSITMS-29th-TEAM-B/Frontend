// countStore.ts
import { atom } from "recoil";

export const yearState = atom<number | null>({
  key: "yearState",
  default: null,
});

export const keywordState = atom<number | null>({
  key: "keywordState",
  default: null,
});
