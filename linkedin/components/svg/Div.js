import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Div = ({ userId, buttonsVis, handleClick, handleTestClick, handleDeleteClick, nodeDatum, actionVisible }) => {

    return (
        <>
            {buttonsVis  ?
                <motion.div>
                    {nodeDatum._id ?
                        <div >
                            {nodeDatum.rootUser === userId ?
                                <>
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] ml-16' style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] ml-12' disabled={!nodeDatum.parentID} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] ml-10' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }}>Просмотр</motion.button >
                                </> :
                                <>
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] ml-16' style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить</motion.button >
                                    <motion.button className='hover:bg-sky-700 rounded-[8px] ml-16' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }}>{nodeDatum.name}</motion.button>
                                </>
                            }
                        </div> :
                        <div >
                            <motion.button className='hover:bg-sky-700 rounded-[8px] ml-16' disabled={true} style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить </motion.button>
                            <motion.button className='hover:bg-sky-700 rounded-[8px] ml-12' disabled={true} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить </motion.button>
                            <motion.button className='hover:bg-sky-700 rounded-[8px] ml-10' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >{nodeDatum.name}</motion.button>
                        </div>
                    }
                </motion.div>

                :
                <motion.div>
                    <button className='hover:bg-sky-700 rounded-[8px]' onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >{nodeDatum.name}</button>
                </motion.div>
            }
        </>
    )
}

export default Div