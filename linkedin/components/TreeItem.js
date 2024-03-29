import React from 'react'
import { Button } from '@mui/material';

const TreeItem = ({ tree, handleTreeNameClick, handleTreeClick}) => {
    return (
        <li className="py-3 sm:py-4 w-11">
            <div className="flex items-end space-x-4">
                 {/* <p  className="sidebarLink" onClick={handleTreeNameClick(tree._id)}>{tree.name}</p> */}
                <Button className='text-[8px]' variant="contained bg-blue-500 border-2" onClick={() => handleTreeNameClick(tree._id)} >{tree.name}</Button>

                <Button className='text-[8px]' variant="outlined" color="error" onClick={() => handleTreeClick(tree._id)}>Удалить</Button>
            </div>
            {tree.isPrivate === true ? <label className='text-[10px]'>private</label> : <label className='text-[10px]'>public</label>}
        </li>
    )
}

export default TreeItem