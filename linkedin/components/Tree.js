import { Button } from '@mui/material';
import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { useRecoilState } from 'recoil';
import { CurrentBranchState } from '../atoms/branchAtom';
import { buttonsVisible } from '../atoms/branchAtom';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { selectedTreeState } from '../atoms/treeAtom';
import { useCenteredTree } from "./helpers";
import { motion } from 'framer-motion'
export default function OrgChartTree({ data }) {
  const [translate, containerRef] = useCenteredTree();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const [buttonsVis, setButtonsVis] = useRecoilState(buttonsVisible)
  const handleClick = (nodeDatum) => {
    // console.log(nodeDatum)
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch,
      description: nodeDatum.description
    })
    setButtonsVis(false)
    setModalOpen(true);
    setModalType("addBranch");
  }

  const handleDeleteClick = (nodeDatum) => {
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch
    })
    setModalOpen(true);
    setModalType("deleteBranch");
  }

  const handleTestClick = (nodeDatum) => {
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch,
      description: nodeDatum.description
    })
    setModalOpen(true);
    setModalType("editBranch");
  }

  const animateVisible = () => {
    setButtonsVis(true)
  }

  const animateNotVisible = () => {
    setButtonsVis(false)
  }

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    handleClick
  }) =>

  (
      <g onMouseLeave={animateNotVisible} className="">
        <defs>
        <clipPath id='circleView'>
         
          <motion.circle
      animate={buttonsVis ? { scale: 1.3}: { scale: 0.8 }}
      onMouseEnter={animateVisible}
      transition={{ ease: "easeOut", duration: 2 }}
      onClick={toggleNode}
        cx={50}
        cy={50}
        r={38}
        fill='none'
        // className="stroke-cyan-500"
        strokeWidth='2'>
      </motion.circle>
        </clipPath>
      </defs>
      <motion.image
      animate={buttonsVis ? { x: 0, y: 50}: { x: -50, y: -50}}
      transition={{ ease: "easeOut", duration: 2 }}
        x='0'
        y='15'
        width='100'
        height='70'
        xlinkHref={nodeDatum.imageBranch}
        clipPath='url(#circleView)'
      />
       {/* <motion.circle cx={50} cy={50} r={50} fill='none' stroke='#FF62E1' strokeWidth={2} /> */}
       <motion.circle animate={buttonsVis ? { scale: 1.3 }: {scale: 0.8}} transition={{ ease: "easeOut", duration: 2 }}  onMouseEnter={animateVisible} onClick={toggleNode}  className="stroke-cyan-500" id='myCircle' r={42} fill="#3b82f6"  ></motion.circle> 
      
       
        {/* <image  className='' href={nodeDatum.imageBranch} preserveAspectRatio="xMidYMid slice" height="103" width="60" x={210} clip-path="url(#myCircle)"  /> */}
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps} >
          {buttonsVis ? 
          <motion.div animate={{ x: 0, y:0}} transition={{ ease: "easeOut", duration: 3 }}>
             {nodeDatum._id ?
            <div >
              <button className='hover:bg-sky-700 rounded-[8px] ml-12' style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить элемент</button>
              <button className='hover:bg-sky-700 rounded-[8px] ml-6' disabled={!nodeDatum.parentID} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить элемент</button>
              <h3 className='hover:bg-sky-700 rounded-[8px]' onClick={() => handleTestClick(nodeDatum)} style={{ textAlign: "left", font: "bold italic large serif", color: "#191970", fontSize: '26x' }}>{nodeDatum.name}</h3>
            </div> :
            <div >
              <button className='hover:bg-sky-700 rounded-[8px] ml-12' disabled={true} style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить элемент</button>
              <button className='hover:bg-sky-700 rounded-[8px] ml-6' disabled={true} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить элемент</button>
              <h3 className='hover:bg-sky-700 rounded-[8px]' onClick={() => handleTestClick(nodeDatum)} style={{ textAlign: "left", font: "bold italic large serif", color: "#191970", fontSize: '26px' }}>{nodeDatum.name}</h3>
            </div>
          }
          </motion.div>
          :   
          <motion.div animate={{ x: 0, y: 0, opacity: 0.75}} transition={{ ease: "easeOut", duration: 3 }}>
             <h3 className='hover:bg-sky-700 rounded-[8px]' onClick={() => handleTestClick(nodeDatum)} style={{ textAlign: "left", font: "bold italic large serif", color: "#191970", fontSize: '20px' }}>{nodeDatum.name}</h3>
            </motion.div>}
          
        </foreignObject>
      </g>
  );

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 260, y: 180 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 0 };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '64em', height: '40em' }}>
      <Tree
        data={data}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, handleClick })
        }
        pathFunc={straightPathFunc}
        translate={translate}
        nodeSize={nodeSize}
        orientation={"vertical"}
        depthFactor={200}
      />
    </div>
  );
}