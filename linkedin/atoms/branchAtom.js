import { atom } from "recoil";

export const CurrentBranchState = atom({
  key: "CurrentBranchState",
  default: {
    _id: "",
    name: "",
    imageBranch:"",
    rootUser: ""
  },
});

export const handleBranchState = atom({
  key: "handleBranchState",
  default: false,
});


export const buttonsVisible = atom({
  key: "buttonsVisible",
  default: false
})


