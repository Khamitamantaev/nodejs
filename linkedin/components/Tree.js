import { Button } from '@mui/material';
import React from 'react';
import Tree from 'react-d3-tree';
import { useRecoilState } from 'recoil';
import { CurrentBranchState } from '../atoms/branchAtom';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { selectedTreeState } from '../atoms/treeAtom';
import { useCenteredTree } from "./helpers";

export default function OrgChartTree({ data }) {
  const [translate, containerRef] = useCenteredTree();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const handleClick = (nodeDatum) => {
    // console.log(nodeDatum)
    setCurrentBranch({
      _id: nodeDatum._id,
      name: nodeDatum.name,
      imageBranch: nodeDatum.imageBranch
    })
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
      imageBranch: nodeDatum.imageBranch
    })
    setModalOpen(true);
    setModalType("editBranch");
  }

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    handleClick
  }) =>

  (
    <g>
      <circle className="stroke-cyan-500" r={12} fill="#1e90ff" ></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        {nodeDatum._id ?
          <div className='rounded-full bg-cyan-500 hover:bg-sky-400 static'>
            <button style={{ width: "100%" }} onClick={() => handleClick(nodeDatum)}>Добавить элемент</button>
            <button disabled={!nodeDatum.parentID} style={{ width: "100%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить элемент</button>
            <h3 onClick={() => handleTestClick(nodeDatum)} style={{ textAlign: "center", font: "bold italic large serif", color: "#191970", fontSize: '20px' }}>{nodeDatum.name}</h3>
            {nodeDatum.children && (
              <button style={{ width: "100%" }} onClick={toggleNode}>
                {nodeDatum.__rd3t.collapsed ? "Развернуть" : "Свернуть"}
              </button>
            )}
          </div> :
          <div className='rounded-full bg-cyan-500 hover:bg-sky-400 static'>
            <button disabled={true} style={{ width: "100%" }} onClick={() => handleClick(nodeDatum)}>Добавить элемент</button>
            <button disabled={true} style={{ width: "100%" }} onClick={() => handleDeleteClick(nodeDatum)}>Удалить элемент</button>
            <h3 onClick={() => handleTestClick(nodeDatum)} style={{ textAlign: "center", font: "bold italic large serif", color: "#191970", fontSize: '20px' }}>{nodeDatum.name}</h3>

            {nodeDatum.children && (
              <button style={{ width: "100%" }} onClick={toggleNode}>
                {nodeDatum.__rd3t.collapsed ? "Развернуть" : "Свернуть"}
              </button>
            )}
          </div>
        }
      </foreignObject>
    </g>
  );

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 200, y: 180 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 10 };

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