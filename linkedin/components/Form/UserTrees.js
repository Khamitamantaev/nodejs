import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { modalState, modalTypeState } from '../../atoms/modalAtom';
import { handleTreeState, selectedTreeState, userTreeList } from '../../atoms/treeAtom';
const UserTrees = ({data}) => {
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const [trees, setTrees] = useRecoilState(userTreeList)
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetch("/api/tree", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setTrees(responseData.trees)
    };
    fetchTrees();
  }, [handleTree])

  const handleTreeClick = (id) => {
    setCurrentTree(id)
    setModalOpen(true);
    setModalType("deleteTree");
  }

  return (
    <div className="p-4">
      {currentTree ? <div className="">
        {trees && trees.length ? (<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {trees.map(tree => (
            <li className="py-3 sm:py-4 " key={tree._id}>
              <div className="flex items-end space-x-4">
                <Button variant="contained bg-green-500 border-2"  onClick={() => setCurrentTree(tree._id)} >{tree.name}</Button>
                <Button variant="outlined" color="error" onClick={() => handleTreeClick(tree._id)}>Удалить</Button>
              </div>
            </li>
          ))}
        </ul>) : ""}
      </div> : <div className="border-2 border-rose-600">
        {data && data.length ? (<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(tree => (
            <li className="py-3 sm:py-4 " key={tree._id}>
              <div className="flex items-end space-x-4">
                <Button variant="contained bg-green-500 border-2"  onClick={() => setCurrentTree(tree._id)} >{tree.name}</Button>
                <Button variant="outlined" color="error" onClick={() => handleTreeClick(tree._id)}>Удалить</Button>
              </div>
            </li>
          ))}
        </ul>) : ""}
      </div>}
    </div>
  )
}

export default UserTrees


