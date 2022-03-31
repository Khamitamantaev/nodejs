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
  },[handleTree])

  const validate = values => {
    const errors = {};
    if (!values.treename) {
      errors.treename = 'Пустое имя';
    } else if (values.treename.length > 10) {
      errors.treename = 'Должно быть меньше 10 символов';
    }
  
    // if (!values.lastName) {
    //   errors.lastName = 'Required';
    // } else if (values.lastName.length > 20) {
    //   errors.lastName = 'Must be 20 characters or less';
    // }
  
    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      treename: '',
    },
    validate,
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
      {formik.errors.treename ? <div>{formik.errors.treename}</div> : null}
      <button type="submit" disabled={formik.errors.treename ? true: false}>Добавить</button>
    </form>
  );
}

export default AddTreeForm;