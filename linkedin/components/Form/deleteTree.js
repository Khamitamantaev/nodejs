import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentBranchState } from "../../atoms/branchAtom";
import { modalState } from "../../atoms/modalAtom";
import {  handleBranchState } from "../../atoms/branchAtom";
import {  handlePostState } from "../../atoms/postAtom";
import { handleTreeState, selectedTreeState } from "../../atoms/treeAtom";

function DeleteTree() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)

  const deleteTree = async (e) => {
    e.preventDefault();
    console.log(currentBranch._id)
     await fetch(`/api/tree/${currentTree}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHandleTree(true);
    setModalOpen(false);
  };

  return (
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        onClick={deleteTree}
      >
        Удалить
      </button>
  );
}

export default DeleteTree;
