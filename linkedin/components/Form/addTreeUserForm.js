import { useRecoilState } from "recoil";
import { CurrentBranchState } from "../../atoms/branchAtom";
import { modalState } from "../../atoms/modalAtom";
import { handleBranchState } from "../../atoms/branchAtom";
import { handlePostState } from "../../atoms/postAtom";
import { handleTreeState, selectedTreeState, useSSRTreesState } from "../../atoms/treeAtom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddTreeUserForm = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [useSSRTrees, setUseSSRTrees] = useRecoilState(useSSRTreesState)
  const onSubmitTree = async (values) => {
    await fetch('/api/tree', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.treeName, isPrivate: true })
    })
    setUseSSRTrees(false)
    setHandleTree(true)
    setModalOpen(false);
  }

  return (
    <Formik
      initialValues={{ treeName: '' }}
      validationSchema={Yup.object({
        treeName: Yup.string()
          .max(14, 'Не более 14 символов')
          .required('Required'),
      })}
      onSubmit={onSubmitTree}
    >
      <Form>
        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Tree name" name="treeName" />
        <ErrorMessage name="treeName" />
        <button type="submit">Добавить</button>
      </Form>
    </Formik>
  );
};

export default AddTreeUserForm;