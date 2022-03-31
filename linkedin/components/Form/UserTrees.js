import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { modalState, modalTypeState } from '../../atoms/modalAtom';
import { handleTreeState, selectedTreeState, userTreeList } from '../../atoms/treeAtom';
const UserTrees = () => {
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const [trees, setTrees] = useRecoilState(userTreeList)
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  useEffect(() => {
    
  }, [handleTree])

  const handleTreeClick = (id) => {
    setCurrentTree(id)
    setModalOpen(true);
    setModalType("deleteTree");
  }

  return (
    <div className="p-4">
      <div className="">
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
      </div>
    </div>
  )
}

export default UserTrees