// countStore.ts
import { atom } from "recoil";
import { TagMenuType, TagType } from "../types/experience";

export const yearState = atom<number | null>({
  key: "yearState",
  default: null,
});

export const primeTagState = atom<TagType | null>({
  key: "primeTagState",
  default: null,
});

export const subTagState = atom<TagMenuType | null>({
  key: "subTagState",
  default: null,
});

export const deleteState = atom<boolean>({
  key: "deleteState",
  default: false,
});

export const deleteTagState = atom<TagType | null>({
  key: "deleteTagState",
  default: null,
});
