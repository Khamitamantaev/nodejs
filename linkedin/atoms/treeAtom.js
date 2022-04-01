import { atom, selector } from "recoil";

export const selectedTreeState = atom({
  key: "selectedTreeState",
  default: ""
});

export const userTreeList = atom({
  key: "userTreeList",
  default: []
})

export const handleTreeState = atom({
  key: "handleTreeState",
  default: false,
});

export const useSSRTreesState = atom({
  key: "useSSRTreesState",
  default: true,
});
