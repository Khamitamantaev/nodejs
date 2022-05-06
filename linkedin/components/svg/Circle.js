import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Circle = ({ animateVisible, buttonsVis, nodeDatum, toggleNode }) => {
    const [scale, setScale] = useState(1.2)

    const actionVisible = () => {
        animateVisible()
        setScale(4)
    }

    const actionNotVisible = () => {
        animateVisible()
        setScale(1.2)
    }

    return (
        <>
            {nodeDatum.imageBranch ?
                <>
                    <motion.image
                        onClick={toggleNode}
                        onMouseEnter={actionVisible}
                        onMouseOut={actionNotVisible}
                        animate={buttonsVis ? { x: -50, y: -50, scale: scale, rotate: 360 } : { x: -50, y: -50, scale: scale, rotate:360 }}
                        transition={{ ease: "easeOut", duration: 1 }}
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
                                animate={buttonsVis ? { scale: 1.4 } : { scale: 0.8 }}
                                transition={{ ease: "easeOut", duration: 1 }}
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
                    <motion.image
                        onClick={toggleNode}
                        onMouseEnter={actionVisible}
                        onMouseOut={actionNotVisible}
                        animate={buttonsVis ? { x: -50, y: -50, scale: scale, rotate: 360 } : { x: -50, y: -50, scale: scale, rotate: 360 }}
                        transition={{ ease: "easeOut", duration: 1 }}
                        x={0}
                        y={19}
                        width='100'
                        height='70'
                        xlinkHref='/tree/tree.jpg'
                        clipPath='url(#circleView)'
                    />
                    <defs>
                        <clipPath id='circleView'>

                            <motion.circle
                                animate={buttonsVis ? { scale: 1.4 } : { scale: 0.8 }}
                                transition={{ ease: "easeOut", duration: 1 }}
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
                </>
            }
        </>
    )
}

export default Circle