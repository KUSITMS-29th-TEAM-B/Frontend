// countStore.ts
import { atom } from "recoil";
import { TagType } from "../types/experience";

export const yearState = atom<number | null>({
  key: "yearState",
  default: null,
});

export const primeTagState = atom<TagType | null>({
  key: "primeTagState",
  default: null,
});

export const deleteState = atom<boolean>({
  key: "deleteState",
  default: false,
});
