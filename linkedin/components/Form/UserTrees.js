import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { handleTreeState, selectedTreeState, userTreeList } from '../../atoms/treeAtom';
const UserTrees = () => {
    const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
    // const user_trees = useRecoilValueLoadable(userTreeList)
    const [trees, setTrees] = useState([])
    const [handleTree, setHandleTree] = useRecoilState(handleTreeState);

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
    },[handleTree])

  return (
    <div className="w-3/3 bg-white rounded-lg shadow">
      {trees && trees.length? (
      <ul className="divide-y-2 divide-gray-100">{trees.map(tree => (
        <li className='p-3' key={tree._id}><Button onClick={() => setCurrentTree(tree._id)} >{tree.name}</Button></li>
    ))}</ul>
    ):""}
    
</div>
   
  )
}

export default UserTrees