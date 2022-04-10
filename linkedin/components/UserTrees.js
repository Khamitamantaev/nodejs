import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { handleTreeState, selectedTreeState, userTreeList, useSSRTreesState } from '../atoms/treeAtom';
import TreeItem from './TreeItem';
const UserTrees = ({data}) => {
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const [trees, setTrees] = useRecoilState(userTreeList)
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [useSSRTrees, setUseSSRTrees] = useRecoilState(useSSRTreesState)

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
  }, [handleTree, useSSRTrees])

  const handleTreeNameClick = (id) => {
    setCurrentTree(id)
    setUseSSRTrees(false)
  }

  const handleTreeClick = (id) => {
    setCurrentTree(id)
    setModalOpen(true);
    setModalType("deleteTree");
  }

  return (
    <div className="">
      {!useSSRTrees ? <div className="">
        {trees && trees.length ? (<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {trees.map(tree => (
            <TreeItem key={tree._id} tree={tree} handleTreeNameClick={handleTreeNameClick} handleTreeClick={handleTreeClick}  /> 
          ))}
        </ul>) : ""}
      </div> : <div className=''>
        {data && data.length ? (<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(tree => (
           <TreeItem key={tree._id} tree={tree} handleTreeNameClick={handleTreeNameClick} handleTreeClick={handleTreeClick}  /> 
          ))}
        </ul>) : ""}
      </div>}
    </div>
  )
}

export default UserTrees


