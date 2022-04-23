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
import Circle from './svg/Circle';
export default function OrgChartTree({ data }) {
  const [translate, containerRef] = useCenteredTree();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const [buttonsVis, setButtonsVis] = useRecoilState(buttonsVisible)
  const handleClick = (nodeDatum) => {
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
        <Circle animateVisible={animateVisible} buttonsVis={buttonsVis} nodeDatum={nodeDatum} toggleNode={toggleNode}/>
        <foreignObject {...foreignObjectProps} >
          {buttonsVis ? 
          <motion.div animate={{ x: 0, y:0}} transition={{ ease: "easeOut", duration: 3 }}>
             {nodeDatum._id ?
            <div >
              <button className='hover:bg-sky-700 rounded-[8px] ml-8' style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить</button>
              <button className='hover:bg-sky-700 rounded-[8px] ml-2' disabled={!nodeDatum.parentID} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить</button>
              <button className='hover:bg-sky-700 rounded-[8px]'  onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }}>Просмотр</button>
            </div> :
            <div >
              <button className='hover:bg-sky-700 rounded-[8px] ml-8' disabled={true} style={{ width: "60%" }} onClick={() => handleClick(nodeDatum)}>Добавить </button>
              <button className='hover:bg-sky-700 rounded-[8px] ml-2' disabled={true} style={{ width: "65%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить </button>
              <button className='hover:bg-sky-700 rounded-[8px]'  onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >Просмотр</button>
            </div>
          }
          </motion.div>
          :   
          <motion.div animate={{ x: 0, y: 0, opacity: 0.75}} transition={{ ease: "easeOut", duration: 3 }}>
              <button className='hover:bg-sky-700 rounded-[8px]'  onClick={() => handleTestClick(nodeDatum)} disabled={!nodeDatum.parentID} style={{ width: "65%" }} >Просмотр</button>
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
        depthFactor={180}
      />
    </div>
  );
}