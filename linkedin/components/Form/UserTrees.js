import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { selectedTreeState, userTreeList } from '../../atoms/treeAtom';

const UserTrees = () => {
    const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
    const user_trees = useRecoilValueLoadable(userTreeList);
    useEffect(() => {
        console.log(user_trees.contents)
    },[currentTree])

  return (
    <div class="w-3/3 bg-white rounded-lg shadow">
    <ul >
    <ul className="divide-y-2 divide-gray-100">{[{"_id":"1","name":"Khamit"},{"_id":"2","name":"Aza"},{"_id":"3","name":"AZAMAT"}].map(tree => (
        <li className='p-3' onClick={() => setCurrentTree(tree)} key={tree._id}>{tree.name}</li>
    ))}</ul>
    </ul>
</div>
   
  )
}

export default UserTrees