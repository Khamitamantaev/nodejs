import { atom, selector } from "recoil";

export const selectedTreeState = atom({
  key: "selectedTreeState",
  default: ""
});

export const userTreesState = selector({
  key: "userTreesState",
  get: async () => {
    let response = await fetch("/api/tree");
    let json = await response.json();
    return json.trees
  }
});

export const userTreeList = atom({
  key: "userTreeList",
  default: userTreesState
})

export const handleTreeState = atom({
  key: "handleTreeState",
  default: false,
});
