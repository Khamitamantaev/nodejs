import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { selectedTreeState, userTreeList } from '../../atoms/treeAtom';
const UserTrees = () => {
    const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
    const user_trees = useRecoilValueLoadable(userTreeList)

  return (
    <div className="w-3/3 bg-white rounded-lg shadow">
      {user_trees.contents && user_trees.contents.length? (
      <ul className="divide-y-2 divide-gray-100">{user_trees.contents.map(tree => (
        <li className='p-3' key={tree._id}><Button onClick={() => setCurrentTree(tree)} >{tree.name}</Button></li>
    ))}</ul>
    ):""}
    
</div>
   
  )
}

export default UserTrees