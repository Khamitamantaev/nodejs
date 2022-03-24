import { atom } from "recoil";

export const handleRodosState = atom({
  key: "handleRodosState",
  default: false,
});

export const useSSRRodosState = atom({
  key: "useSSRRodosState",
  default: true,
});
