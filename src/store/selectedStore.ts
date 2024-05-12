// countStore.ts
import { atom } from "recoil";

export const yearState = atom<number | null>({
  key: "yearState",
  default: null,
});

export const keywordState = atom<string | null>({
  key: "keywordState",
  default: null,
});
