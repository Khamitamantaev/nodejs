import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentBranchState } from "../../atoms/branchAtom";
import { modalState } from "../../atoms/modalAtom";
import { handleBranchState } from "../../atoms/branchAtom";
import { handlePostState } from "../../atoms/postAtom";
import { handleTreeState, selectedTreeState } from "../../atoms/treeAtom";
import { useFormik } from 'formik';

function AddTreeForm() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)


  const onSubmitTree = async (values) => {
    fetch('/api/tree', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.treename })
    })
    setHandleTree(true)
    setModalOpen(false);
  }

  useEffect(() => {
    setHandleTree(false)
    console.log("handle HERE")
    console.log(handleTree)
  },[handleTree])

  const formik = useFormik({
    initialValues: {
      treename: '',
    },
    onSubmit: onSubmitTree,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Add tree (Optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={formik.values.treename}
        name="treename"
        onChange={formik.handleChange}
      />
      <button type="submit" disabled={formik.values.treename ? false: true}>Добавить</button>
    </form>
  );
}

export default AddTreeForm;