import { Button } from '@mui/material';
import React from 'react';
import Tree from 'react-d3-tree';
import { useCenteredTree } from "./helpers";
// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.


export default function OrgChartTree({ data }) {
  const [translate, containerRef] = useCenteredTree();

  const handleClick = (nodeDatum) => {
    console.log(nodeDatum)
  }

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    handleClick
  }) =>

  (
    <g>
      <circle r={15} fill="#1e90ff" ></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div style={{ border: "1px solid black", backgroundColor: "#eee8aa", fontSize: "12px" }} >
          <button style={{ width: "100%" }} onClick={() => handleClick(nodeDatum)}>Добавить элемент</button>
          <h3 style={{ textAlign: "center", font: "bold italic large serif", color: "#191970", fontSize: '20px' }}>{nodeDatum.name}</h3>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Развернуть" : "Свернуть"}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 200, y: 120 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '50em', height: '40em' }}>
      <Tree
        data={data}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, handleClick })
        }
        pathFunc={straightPathFunc}
        translate={translate}
        nodeSize={nodeSize}
        orientation={"vertical"}
      />
    </div>
  );
}