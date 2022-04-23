import React from 'react'
import { motion } from 'framer-motion'

const Circle = ({ animateVisible, buttonsVis, nodeDatum, toggleNode}) => {
    return (
        <>
            {nodeDatum.imageBranch ?
                <>
                    <motion.image
                    onClick={toggleNode}
                        onMouseEnter={animateVisible}
                        animate={buttonsVis ? { x: -50, y: -50, scale: 2 } : { x: -50, y: -50, scale: 1.2 }}
                        transition={{ ease: "easeOut", duration: 2 }}
                        x={0}
                        y={19}
                        width='100'
                        height='70'
                        xlinkHref={nodeDatum.imageBranch}
                        clipPath='url(#circleView)'
                    />
                    <defs>
                        <clipPath id='circleView'>

                            <motion.circle
                                animate={buttonsVis ? { scale: 1.3 } : { scale: 0.8 }}

                                transition={{ ease: "easeOut", duration: 2 }}
                                onClick={toggleNode}
                                cx={50}
                                cy={54}
                                r={22}
                                fill='none'
                                stroke="red"
                                strokeWidth='2'>
                            </motion.circle>
                        </clipPath>
                    </defs>
                </> :
                <>
                    <motion.circle animate={buttonsVis ? { scale: 1.3 } : { scale: 0.4 }} transition={{ ease: "easeOut", duration: 2 }} onMouseEnter={animateVisible} onClick={toggleNode} className="stroke-cyan-500" id='myCircle' r={50} fill="#3b82f6"  ></motion.circle>
                </>
            }
        </>
    )
}

export default Circle