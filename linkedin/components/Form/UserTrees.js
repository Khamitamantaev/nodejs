import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { modalState, modalTypeState } from '../../atoms/modalAtom';
import { handleTreeState, selectedTreeState, userTreeList } from '../../atoms/treeAtom';
const UserTrees = () => {
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const [trees, setTrees] = useState([])
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
    console.log(id)
    setCurrentTree(id)
    setModalOpen(true);
    setModalType("deleteTree");
  }

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   <div className="flow-root">
   {trees && trees.length ? (  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
   {trees.map(tree => (
     <li className="py-3 sm:py-4 "  key={tree._id}>
     <div className="flex items-center space-x-4">
         <Button onClick={() => setCurrentTree(tree._id)} >{tree.name}</Button>
         <Button onClick={() => handleTreeClick(tree._id)}>Удалить</Button>
     </div>
     
 </li>
   ))}
        </ul> ): ""}
   </div>
</div>
    // <div className="w-3/3 bg-white rounded-lg shadow">
    //   {trees && trees.length ? (
    //     <ul className="divide-y-2 divide-gray-100">{trees.map(tree => (
          
    //       <li class="py-3 sm:py-4 "  key={tree._id}>
    //             <div class="flex items-center space-x-4">
    //                 {/* <div class="flex-shrink-0">
    //                     <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
    //                 </div> */}
    //                 <div class="flex-1 min-w-0">
    //                     <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
    //                         Neil Sims
    //                     </p>
    //                     <p class="text-sm text-gray-500 truncate dark:text-gray-400">
    //                         email@windster.com
    //                     </p>
    //                 </div>
    //                 <Button onClick={() => setCurrentTree(tree._id)} >{tree.name}</Button>
    //             </div>
    //         </li>
        
    //     ))}</ul>
    //   ) : ""}
    // </div>

  )
}

export default UserTrees