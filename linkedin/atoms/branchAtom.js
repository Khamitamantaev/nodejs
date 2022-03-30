import { atom } from "recoil";

export const CurrentBranchState = atom({
  key: "CurrentBranchState",
  default: {
    _id: "",
    name: "",
    imageBranch:""
  },
});

export const handleBranchState = atom({
  key: "handleBranchState",
  default: false,
});


