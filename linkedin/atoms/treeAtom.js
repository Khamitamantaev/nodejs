import { atom, selector,selectorFamily } from "recoil";

export const selectedTreeState = atom({
  key: "selectedTreeState",
  default: ""
});

export const userTreesState = selector({
  key: "userTreesState",
  get: async () => {
    //  await fetch("/api/tree").then(response => response.json()).then(data => console.log(data))
    let response = await fetch("/api/tree");
    let json = await response.json();
    return json.trees
    // const trees = await response;
    // const treeEntries = trees.map((tree, i) => [i, tree]);
    // return new Map(treeEntries);
  }
});

export const userTreeList = atom({
  key: "userTreeList",
  default: userTreesState
})


//

// const currentTree = selector({
//   key: 'currentTree',
//   get: async ({get}) => {
//     let treeID = get(selectedTreeState)
//     let response = await fetch(`/api/tree/${treeID}`);
//     let json = await response.json()
//     return json 
//   },
// });

// export const userTree = atom({
//   key: "userTree",
//   default: currentTree
// })
