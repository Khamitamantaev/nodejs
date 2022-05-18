import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { searchTreeState } from '../../atoms/treeAtom'

const Circle = ({ animateVisible, buttonsVis, nodeDatum, toggleNode }) => {
    const [scale, setScale] = useState(1.2)
    const [searchTree, setSearchTree] = useRecoilState(searchTreeState)
    const [scaleCircle, setScaleCircle] = useState(1.6)

    const actionVisible = () => {
        animateVisible()
        setScale(5.6)
        setScaleCircle(7)
    }

    const actionNotVisible = () => {
        animateVisible()
        setScale(1.2)
        setScaleCircle(1.6)
    }

    return (
        <>
            {nodeDatum.imageBranch ?
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
                        xlinkHref={nodeDatum.imageBranch}
                        clipPath='url(#circleView)'
                    />
                    <defs>
                        <clipPath id='circleView'>
                            <motion.circle
                                // animate={buttonsVis ? { scale: 1.4 } : { scale: 0.8 }}
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
                    {/* <motion.circle  transition={{ ease: "easeOut", duration: 1.2 }} onMouseOut={actionNotVisible}  onMouseEnter={actionVisible} cy={3} r={22} animate={nodeDatum.name === searchTree ? { scale: scaleCircle, stroke: 'yellow' }: { scale: scaleCircle, stroke: 'none' }}  fill='none'></motion.circle> */}
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
                                // animate={buttonsVis ? { scale: 1.4 } : { scale: 0.8 }}
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
                    {/* <motion.circle  transition={{ ease: "easeOut", duration: 1.2 }} onMouseOut={actionNotVisible} cy={3} r={22} onMouseEnter={actionVisible} animate={nodeDatum.name === searchTree ? { scale: scaleCircle , stroke: 'yellow' }: { scale: scaleCircle, stroke: 'none' }}  fill='none'></motion.circle> */}
                </>
            }
        </>
    )
}

export default Circle