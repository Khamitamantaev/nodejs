import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { selectedTreeState } from '../../atoms/treeAtom';

const UserTrees = () => {

    const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);

    useEffect(() => {
        console.log(currentTree)
    },[currentTree])

  return (
    <div>{[{"_id":"1","name":"Khamit"},{"_id":"2","name":"Aza"},{"_id":"3","name":"AZAMAT"}].map(tree => (
        <Button onClick={() => setCurrentTree(tree)} key={tree._id}>{tree.name}</Button>
    ))}</div>
  )
}

export default UserTrees