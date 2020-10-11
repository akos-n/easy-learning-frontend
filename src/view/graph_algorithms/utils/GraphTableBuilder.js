import React from "react";
import { v4 } from "uuid";

const AlgorithmType = {
  BFS: "Breadth-First Search",
  DFS: "Depth-First Search",
  TOPO: "Topological order",
  TOPO_DFS: "Topological order with Depth-First Search",
  KRUSKAL: "Kruskal algorithm for minimum-spanning-tree",
  PRIM: "Prim's algorithm for minimum-spanning-tree",
  DIJKSTRA: "Dijkstra's Shortest Path First algorithm",
  QBBF: "Queue-based Bellman-Ford algorithm (shortest path)",
  FW: "Floyd-Warshall algorithm (shortest path)",
};

function getCellStringForHTML(item) {
  if (item === null) return <>&Oslash;</>;
  else if (item === Infinity) return <>&infin;</>;
  else return <>{item}</>;
}

function buildAttributeCells(attr, vertices) {
  let attrCells = [];
  if (attr === "indexOfVertex") {
    for (let i = 0; i < vertices.length; ++i) {
      attrCells.push(
        React.createElement(
          "th",
          {
            key: v4(),
          },
          i
        )
      );
    }
  } else {
    for (let i = 0; i < vertices.length; ++i) {
      attrCells.push(
        React.createElement(
          "td",
          {
            key: v4(),
          },
          getCellStringForHTML(vertices[i][attr])
        )
      );
    }
  }
  return attrCells;
}

function buildBFSHead(vertices) {
  return [<th key={v4()}>d</th>]
    .concat(buildAttributeCells("indexOfVertex", vertices))
    .concat([<th key={v4()}>Q</th>])
    .concat([<th key={v4()}>&pi;</th>])
    .concat(buildAttributeCells("indexOfVertex", vertices));
}

function buildBFSRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0 ? " " : currentStep.currentVertex
    ),
  ]
    .concat(buildAttributeCells("depth", currentStep.vertices))
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        "<" + currentStep.queue.items.toString() + ">"
      ),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(buildAttributeCells("parent", currentStep.vertices));
}

function buildDFSAttributeCells(vertices) {
  let attrCells = [];
  for (let i = 0; i < vertices.length; ++i) {
    attrCells.push(
      React.createElement(
        "td",
        {
          key: v4(),
        },
        <>
          {getCellStringForHTML(
            vertices[i]["discoveryTime"] === 0
              ? null
              : vertices[i]["discoveryTime"]
          )}
          /
          {getCellStringForHTML(
            vertices[i]["finishingTime"] === 0
              ? null
              : vertices[i]["finishingTime"]
          )}
        </>
      )
    );
  }
  return attrCells;
}

function buildDFSHead(vertices) {
  return [<th key={v4()}>Vertex</th>].concat([
    buildAttributeCells("indexOfVertex", vertices),
  ]);
}

function buildDFSRowCells(currentStep) {
  return [React.createElement("td", { key: v4() }, "Discovery/Finish")].concat(
    buildDFSAttributeCells(currentStep.vertices)
  );
}

function buildTOPOHead() {
  return [<th key={v4()}>Topological order</th>]
    .concat([<th key={v4()}>Indegrees for vertices</th>])
    .concat([<th key={v4()}>Stack</th>]);
}

function buildTOPORowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.topologicalOrder.join(", ")
    ),
  ]
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        currentStep.inDegrees.join(", ")
      ),
    ])
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        "<" + currentStep.stack.items.join(", ") + ">"
      ),
    ]);
}

function buildTOPOWithDFSHead() {
  return [<th key={v4()}>Topological order</th>].concat([
    <th key={v4()}>Stack</th>,
  ]);
}

function buildTOPOWithDFSRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.topologicalOrder.join(", ")
    ),
  ].concat([
    React.createElement(
      "td",
      { key: v4() },
      "<" + currentStep.stack.items.join(", ") + ">"
    ),
  ]);
}

function buildKruskalHead() {
  return [<th key={v4()}>Sets</th>]
    .concat([<th key={v4()}>Sorted edges</th>])
    .concat([<th key={v4()}>Chosen edges</th>]);
}

function buildKruskalRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      (() => {
        let cellString = [];
        for (let i = 0; i < currentStep.kruskalSets.length; ++i) {
          cellString.push("| " + currentStep.kruskalSets[i].join(", ") + " |");
        }
        return cellString.join("\n");
      })()
    ),
  ]
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        (() => {
          let sortedEdgesList = [];
          for (let edge of currentStep.sortedEdges.items) {
            sortedEdgesList.push(
              `| start: ${edge.fromVertex}, end: ${edge.toVertex}, weight: ${edge.weight} |`
            );
          }
          return sortedEdgesList.join("\n");
        })()
      ),
    ])
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        (() => {
          let chosenEdgesList = [];
          for (let edge of currentStep.chosenEdges) {
            chosenEdgesList.push(
              `| start: ${edge.fromVertex}, end: ${edge.toVertex}, weight: ${edge.weight} |`
            );
          }
          return chosenEdgesList.join("\n");
        })()
      ),
    ]);
}

function buildPrimHead(vertices) {
  return [<th key={v4()}>Q, c</th>]
    .concat(buildAttributeCells("indexOfVertex", vertices))
    .concat([<th key={v4()}>&pi;</th>])
    .concat(buildAttributeCells("indexOfVertex", vertices));
}

function buildPrimRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0 ? "init" : currentStep.currentVertex
    ),
  ]
    .concat(buildAttributeCells("cost", currentStep.vertices))
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(buildAttributeCells("parent", currentStep.vertices));
}

function buildQBBFHead(vertices) {
  return buildBFSHead(vertices).concat([<th key={v4()}>round</th>]);
}

function buildQBBFRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0 ? "init" : currentStep.currentVertex
    ),
  ]
    .concat(buildAttributeCells("distance", currentStep.vertices))
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        "<" + currentStep.queue.items.toString() + ">"
      ),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(buildAttributeCells("parent", currentStep.vertices))
    .concat([React.createElement("td", { key: v4() }, currentStep.round)]);
}

function buildDijkstraHead(vertices) {
  return [<th key={v4()}>Q, d</th>]
    .concat(buildAttributeCells("indexOfVertex", vertices))
    .concat([<th key={v4()}>extension</th>])
    .concat([<th key={v4()}>&pi;</th>])
    .concat(buildAttributeCells("indexOfVertex", vertices));
}

function buildDijkstraRowCells(currentStep) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0 ? "init" : " "
    ),
  ]
    .concat(buildAttributeCells("distance", currentStep.vertices))
    .concat([
      React.createElement("td", { key: v4() }, currentStep.currentVertex),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(buildAttributeCells("parent", currentStep.vertices));
}

function buildFWHeadNames(vertices) {
  return [
    <th key={v4()} colSpan={vertices.length + 1} scope="colgroup">
      Distance matrix
    </th>,
  ].concat([
    <th key={v4()} colSpan={vertices.length + 1} scope="colgroup">
      Parent matrix
    </th>,
  ]);
}

function buildFWRow(currentStep, indexOfRow) {
  let distanceRowCells = [];
  let parentRowCells = [];
  distanceRowCells[0] = <th key={v4()}>{indexOfRow}</th>;
  parentRowCells[0] = <th key={v4()}>{indexOfRow}</th>;
  for (let i = 0; i < currentStep.vertices.length; ++i) {
    distanceRowCells.push(
      <td key={v4()}>
        {getCellStringForHTML(currentStep.distanceMatrix[indexOfRow][i])}
      </td>
    );
    parentRowCells.push(
      <td key={v4()}>
        {getCellStringForHTML(currentStep.parentMatrix[indexOfRow][i])}
      </td>
    );
  }

  return distanceRowCells.concat(parentRowCells);
}

function buildFWRowCells(currentStep) {
  let fwRows = [];
  for (let i = 0; i < currentStep.vertices.length; ++i) {
    fwRows.push(<tr key={v4()}>{buildFWRow(currentStep, i)}</tr>);
  }
  return fwRows;
}

function buildFWTable(algorithmSteps) {
  return (
    <>
      <colgroup
        span={
          algorithmSteps.steps[algorithmSteps.currentStepIndex].vertices
            .length + 1
        }
      ></colgroup>
      <colgroup
        span={
          algorithmSteps.steps[algorithmSteps.currentStepIndex].vertices
            .length + 1
        }
      ></colgroup>
      {React.createElement(
        "thead",
        { key: v4() },
        React.createElement(
          "tr",
          { key: v4() },
          buildFWHeadNames(
            algorithmSteps.steps[algorithmSteps.currentStepIndex].vertices
          )
        )
      )}
      {React.createElement(
        "tr",
        { key: v4() },
        [<td key={v4()}> </td>]
          .concat(
            buildAttributeCells(
              "indexOfVertex",
              algorithmSteps.steps[algorithmSteps.currentStepIndex].vertices
            )
          )
          .concat([<td key={v4()}> </td>])
          .concat(
            buildAttributeCells(
              "indexOfVertex",
              algorithmSteps.steps[algorithmSteps.currentStepIndex].vertices
            )
          )
      )}
      {buildFWRowCells(algorithmSteps.steps[algorithmSteps.currentStepIndex])}
    </>
  );
}

function buildRows(algorithmSteps, functionRow) {
  let rows = [];
  for (let i = 0; i <= algorithmSteps.currentStepIndex; ++i) {
    rows.push(
      React.createElement(
        "tr",
        { key: v4() },
        functionRow(algorithmSteps.steps[i])
      )
    );
  }
  return rows;
}

function buildTableContent(algorithmSteps, functionHeader, functionBodyRow) {
  return (
    <>
      {React.createElement(
        "thead",
        { key: v4() },
        React.createElement(
          "tr",
          { key: v4() },
          functionHeader(algorithmSteps.steps[0].vertices)
        )
      )}
      <tbody key={v4()}>{buildRows(algorithmSteps, functionBodyRow)}</tbody>
    </>
  );
}

function chooseTableTypeAndRender(algorithmSteps) {
  if (algorithmSteps.algorithmType === AlgorithmType.BFS)
    return buildTableContent(algorithmSteps, buildBFSHead, buildBFSRowCells);
  else if (algorithmSteps.algorithmType === AlgorithmType.DFS)
    return buildTableContent(algorithmSteps, buildDFSHead, buildDFSRowCells);
  else if (algorithmSteps.algorithmType === AlgorithmType.PRIM)
    return buildTableContent(algorithmSteps, buildPrimHead, buildPrimRowCells);
  else if (algorithmSteps.algorithmType === AlgorithmType.QBBF)
    return buildTableContent(algorithmSteps, buildQBBFHead, buildQBBFRowCells);
  else if (algorithmSteps.algorithmType === AlgorithmType.DIJKSTRA)
    return buildTableContent(
      algorithmSteps,
      buildDijkstraHead,
      buildDijkstraRowCells
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.TOPO)
    return buildTableContent(algorithmSteps, buildTOPOHead, buildTOPORowCells);
  else if (algorithmSteps.algorithmType === AlgorithmType.TOPO_DFS)
    return buildTableContent(
      algorithmSteps,
      buildTOPOWithDFSHead,
      buildTOPOWithDFSRowCells
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.KRUSKAL)
    return buildTableContent(
      algorithmSteps,
      buildKruskalHead,
      buildKruskalRowCells
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.FW)
    return buildFWTable(algorithmSteps);
  else return <></>;
}

function innerBuildTable(algorithmSteps) {
  return (
    <table className="graph-table">
      {chooseTableTypeAndRender(algorithmSteps)}
    </table>
  );
}

function buildTable(algorithmSteps) {
  if (
    [
      AlgorithmType.BFS,
      AlgorithmType.DFS,
      AlgorithmType.PRIM,
      AlgorithmType.QBBF,
      AlgorithmType.DIJKSTRA,
      AlgorithmType.TOPO,
      AlgorithmType.TOPO_DFS,
      AlgorithmType.KRUSKAL,
      AlgorithmType.FW,
    ].includes(algorithmSteps.algorithmType)
  ) {
    return <>{innerBuildTable(algorithmSteps)}</>;
  }
}

export { buildTable as default };
