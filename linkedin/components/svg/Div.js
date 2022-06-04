import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { searchTreeState } from '../../atoms/treeAtom'

const Div = ({ userId, buttonsVis, handleClick, handleTestClick, handleDeleteClick, nodeDatum }) => {
    const [searchTree, setSearchTree] = useRecoilState(searchTreeState)

    return (
        <>
            {buttonsVis ?
                <motion.div>
                    {nodeDatum._id ?
                        <div className='flex flex-col'>
                            {nodeDatum.rootUser === userId ?
                                <>
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32'  onClick={() => handleClick(nodeDatum)}>Добавить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' disabled={!nodeDatum.parentID}  onClick={() => handleDeleteClick(nodeDatum)}>Удалить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} >Просмотр</motion.button >
                                </> :
                                <>
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32'  onClick={() => handleClick(nodeDatum)}>Добавить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} >{nodeDatum.name}</motion.button>
                                </>
                            }
                        </div> :
                        <div  className='flex flex-col'>
                            <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' disabled={true}  onClick={() => handleClick(nodeDatum)}>Добавить </motion.button>
                            <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' disabled={true}  onClick={() => handleDeleteClick(nodeDatum)}>Удалить </motion.button>
                            <motion.button className='hover:bg-sky-700 rounded-[8px] w-20 ml-32' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID}>{nodeDatum.name}</motion.button>
                        </div>
                    }
                </motion.div>
                :
                <motion.div>
                    {/* {nodeDatum.name === searchTree ?
                     <button className='hover:bg-sky-700 rounded-[8px] bg-amber-500' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >{nodeDatum.name}</button> 
                    : 
                    <button className='hover:bg-sky-700 rounded-[8px]' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >{nodeDatum.name}</button>} */}
                    <button className='hover:bg-sky-700 rounded-[8px] w-20 ml-12 ' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} >{nodeDatum.name}</button>
                </motion.div>
            }
        </>
    )
}

export default Div