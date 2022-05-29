import { Button } from '@mui/material';
import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { useRecoilState } from 'recoil';
import { CurrentBranchState } from '../atoms/branchAtom';
import { buttonsVisible } from '../atoms/branchAtom';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { searchTreeState, selectedTreeState } from '../atoms/treeAtom';
import { useCenteredTree } from "./helpers";
import { animate, motion } from 'framer-motion'
import Circle from './svg/Circle';
import Div from './svg/Div';
export default function OrgChartTree({ data, userId }) {
  const [translate, containerRef] = useCenteredTree();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const [buttonsVis, setButtonsVis] = useRecoilState(buttonsVisible)
  const [searchTree, setSearchTree] = useRecoilState(searchTreeState)
  const handleClick = (nodeDatum) => {
    // console.log(nodeDatum)
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch,
      description: nodeDatum.description,
      code: nodeDatum.code,
      url: nodeDatum.url
    })
    setButtonsVis(false)
    setModalOpen(true);
    setModalType("addBranch");
  }

  const handleDeleteClick = (nodeDatum) => {
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch,
      code: nodeDatum.code,
      url: nodeDatum.url
    })
    setModalOpen(true);
    setModalType("deleteBranch");
  }

  const handleTestClick = (nodeDatum) => {
    // console.log(nodeDatum)
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch,
      description: nodeDatum.description,
      rootUser: nodeDatum.rootUser,
      code: nodeDatum.code,
      url: nodeDatum.url
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
      <Circle animateVisible={animateVisible} buttonsVis={buttonsVis} nodeDatum={nodeDatum} toggleNode={toggleNode} />
      <foreignObject {...foreignObjectProps} >
         <Div userId={userId} actionVisible={animateVisible} buttonsVis={buttonsVis} handleClick={handleClick} handleDeleteClick={handleDeleteClick} handleTestClick={handleTestClick} nodeDatum={nodeDatum}/>
      </foreignObject>
    </g>
  );

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 400, y: 180 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 0 };

  return (
    <div className="rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500" id="treeWrapper" style={{ width: '64em', height: '40em' }}>
      <Tree
        data={data}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, handleClick })
        }
        translate={translate}
        nodeSize={nodeSize}
        orientation={"vertical"}
        depthFactor={222}
      />
    </div>
  );
}