import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentBranchState } from "../../atoms/branchAtom";
import { modalState } from "../../atoms/modalAtom";
import { handleBranchState } from "../../atoms/branchAtom";
import { handlePostState } from "../../atoms/postAtom";
import { handleTreeState, selectedTreeState, useSSRTreesState } from "../../atoms/treeAtom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const AddTreeForm = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [useSSRTrees, setUseSSRTrees] = useRecoilState(useSSRTreesState)
  const onSubmitTree = async (values) => {
   await fetch('/api/tree', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.treeName, isPrivate: values.isPrivate })
    })
    setUseSSRTrees(false)
    setHandleTree(true)
    setModalOpen(false);
  }

  return (
    <Formik
      initialValues={{ treeName: '', isPrivate: '0'}}
      validationSchema={Yup.object({
        treeName: Yup.string()
          .max(10, 'Must be 10 characters or less')
          .required('Required'),
      })}
      onSubmit={onSubmitTree}
    >
      <Form>
        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Tree name" name="treeName"/>
        <ErrorMessage name="treeName" />

        <Field className="mt-3" as="select" name="isPrivate">
             <option value="1">Private</option>
             <option value="0">Public</option>
           </Field>
        <button type="submit">Добавить</button>
      </Form>
    </Formik>
  );
};

export default AddTreeForm;