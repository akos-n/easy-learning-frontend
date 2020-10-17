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

function getColorizerDivIfChanged(item, previousItem, innerHTML) {
  if (previousItem !== null && item !== previousItem) {
    console.log(item);
    console.log(previousItem);
    return <span className="changed-table-item">{innerHTML}</span>;
  }
  return <>{innerHTML}</>;
}

function buildAttributeCells(attr, vertices, previousVertices = null) {
  let attrCells = [];
  if (attr === "indexOfVertex") {
    for (let i = 0; i < vertices.length; ++i) {
      attrCells.push(
        React.createElement(
          "th",
          {
            key: v4(),
          },
          vertices[i].vertexNumber
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
          getColorizerDivIfChanged(
            getCellStringForHTML(vertices[i][attr]).props.children,
            previousVertices
              ? getCellStringForHTML(previousVertices[i][attr]).props.children
              : null,
            getCellStringForHTML(vertices[i][attr])
          )
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

function buildBFSRowCells(currentStep, previousStep = null) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0
        ? " "
        : currentStep.vertices[currentStep.currentVertex].vertexNumber
    ),
  ]
    .concat(
      buildAttributeCells(
        "depth",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    )
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        "<" + currentStep.queue.items.join(", ") + ">"
      ),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(
      buildAttributeCells(
        "parent",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    );
}

function buildDFSAttributeCells(vertices, previousVertices = null) {
  let attrCells = [];
  for (let i = 0; i < vertices.length; ++i) {
    attrCells.push(
      React.createElement(
        "td",
        {
          key: v4(),
        },
        <>
          {getColorizerDivIfChanged(
            vertices[i]["discoveryTime"],
            previousVertices ? previousVertices[i]["discoveryTime"] : null,
            getCellStringForHTML(
              vertices[i]["discoveryTime"] === 0
                ? null
                : vertices[i]["discoveryTime"]
            )
          )}
          /
          {getColorizerDivIfChanged(
            vertices[i]["finishingTime"],
            previousVertices ? previousVertices[i]["finishingTime"] : null,
            getCellStringForHTML(
              vertices[i]["finishingTime"] === 0
                ? null
                : vertices[i]["finishingTime"]
            )
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

function buildDFSRowCells(currentStep, previousStep = null) {
  return [React.createElement("td", { key: v4() }, "Discovery/Finish")].concat(
    buildDFSAttributeCells(
      currentStep.vertices,
      previousStep !== null ? previousStep.vertices : null
    )
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
              `{ (${edge.fromVertex}, ${edge.toVertex}); ${edge.weight} }`
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
              `{ (${edge.fromVertex}, ${edge.toVertex}); ${edge.weight} }`
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

function buildPrimRowCells(currentStep, previousStep = null) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0
        ? "init"
        : currentStep.vertices[currentStep.currentVertex].vertexNumber
    ),
  ]
    .concat(
      buildAttributeCells(
        "cost",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    )
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(
      buildAttributeCells(
        "parent",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    );
}

function buildQBBFHead(vertices) {
  return buildBFSHead(vertices).concat([<th key={v4()}>round</th>]);
}

function buildQBBFRowCells(currentStep, previousStep = null) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.currentVertex < 0
        ? "init"
        : currentStep.vertices[currentStep.currentVertex].vertexNumber
    ),
  ]
    .concat(
      buildAttributeCells(
        "distance",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    )
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        "<" + currentStep.queue.items.join(", ") + ">"
      ),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(
      buildAttributeCells(
        "parent",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    )
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        getColorizerDivIfChanged(
          currentStep.round,
          previousStep ? previousStep.round : null,
          currentStep.round
        )
      ),
    ]);
}

function buildDijkstraHead(vertices) {
  return [<th key={v4()}>Q, d</th>]
    .concat(buildAttributeCells("indexOfVertex", vertices))
    .concat([<th key={v4()}>extension</th>])
    .concat([<th key={v4()}>&pi;</th>])
    .concat(buildAttributeCells("indexOfVertex", vertices));
}

function buildDijkstraRowCells(currentStep, previousStep = null) {
  return [
    React.createElement(
      "td",
      { key: v4() },
      currentStep.step === -1 ? "init" : currentStep.step === -2 ? "end" : " "
    ),
  ]
    .concat(
      buildAttributeCells(
        "distance",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    )
    .concat([
      React.createElement(
        "td",
        { key: v4() },
        currentStep.currentVertex !== null
          ? currentStep.vertices[currentStep.currentVertex].vertexNumber
          : null
      ),
    ])
    .concat([React.createElement("td", { key: v4() }, " ")])
    .concat(
      buildAttributeCells(
        "parent",
        currentStep.vertices,
        previousStep ? previousStep.vertices : null
      )
    );
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

function buildFWRow(currentStep, indexOfRow, previousStep = null) {
  let distanceRowCells = [];
  let parentRowCells = [];
  distanceRowCells[0] = (
    <th key={v4()}>{currentStep.vertices[indexOfRow].vertexNumber}</th>
  );
  parentRowCells[0] = (
    <th key={v4()}>{currentStep.vertices[indexOfRow].vertexNumber}</th>
  );
  for (let i = 0; i < currentStep.vertices.length; ++i) {
    distanceRowCells.push(
      <td key={v4()}>
        {getColorizerDivIfChanged(
          getCellStringForHTML(currentStep.distanceMatrix[indexOfRow][i]).props
            .children,
          previousStep
            ? getCellStringForHTML(previousStep.distanceMatrix[indexOfRow][i])
                .props.children
            : null,
          getCellStringForHTML(currentStep.distanceMatrix[indexOfRow][i])
        )}
      </td>
    );
    parentRowCells.push(
      <td key={v4()}>
        {getColorizerDivIfChanged(
          getCellStringForHTML(currentStep.parentMatrix[indexOfRow][i]).props
            .children,
          previousStep
            ? getCellStringForHTML(previousStep.parentMatrix[indexOfRow][i])
                .props.children
            : null,
          getCellStringForHTML(currentStep.parentMatrix[indexOfRow][i])
        )}
      </td>
    );
  }

  return distanceRowCells.concat(parentRowCells);
}

function buildFWRowCells(currentStep, previousStep = null) {
  let fwRows = [];
  for (let i = 0; i < currentStep.vertices.length; ++i) {
    fwRows.push(<tr key={v4()}>{buildFWRow(currentStep, i, previousStep)}</tr>);
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
        "tbody",
        { key: v4() },
        React.createElement(
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
        )
      )}
      {React.createElement(
        "tbody",
        { key: v4() },
        buildFWRowCells(
          algorithmSteps.steps[algorithmSteps.currentStepIndex],
          algorithmSteps.currentStepIndex > 0
            ? algorithmSteps.steps[algorithmSteps.currentStepIndex - 1]
            : null
        )
      )}
    </>
  );
}
function buildFWIndexTableHead() {
  return [<th key={v4()}>k</th>]
    .concat([<th key={v4()}>i</th>])
    .concat([<th key={v4()}>j</th>]);
}
function buildFWIndexTableRowCells(currentStep, previousStep = null) {
  return [
    <td key={v4()}>
      {getColorizerDivIfChanged(
        currentStep.k !== null
          ? currentStep.vertices[currentStep.k].vertexNumber
          : " ",
        previousStep && previousStep.k !== null
          ? previousStep.vertices[previousStep.k].vertexNumber
          : " ",
        currentStep.k !== null
          ? currentStep.vertices[currentStep.k].vertexNumber
          : " "
      )}
    </td>,
  ]
    .concat([
      <td key={v4()}>
        {getColorizerDivIfChanged(
          currentStep.i !== null
            ? currentStep.vertices[currentStep.i].vertexNumber
            : " ",
          previousStep && previousStep.i !== null
            ? previousStep.vertices[previousStep.i].vertexNumber
            : " ",
          currentStep.i !== null
            ? currentStep.vertices[currentStep.i].vertexNumber
            : " "
        )}
      </td>,
    ])
    .concat([
      <td key={v4()}>
        {getColorizerDivIfChanged(
          currentStep.j !== null
            ? currentStep.vertices[currentStep.j].vertexNumber
            : " ",
          previousStep && previousStep.j !== null
            ? previousStep.vertices[previousStep.j].vertexNumber
            : " ",
          currentStep.j !== null
            ? currentStep.vertices[currentStep.j].vertexNumber
            : " "
        )}
      </td>,
    ]);
}

function buildRows(algorithmSteps, functionRow, fromStepIndex = 0) {
  let rows = [];
  for (let i = fromStepIndex; i <= algorithmSteps.currentStepIndex; ++i) {
    rows.push(
      React.createElement(
        "tr",
        { key: v4() },
        functionRow(
          algorithmSteps.steps[i],
          i > 0 ? algorithmSteps.steps[i - 1] : null
        )
      )
    );
  }
  return rows;
}

function buildTableContent(
  algorithmSteps,
  functionHeader,
  functionBodyRow,
  buildOnlyCurrentRowWithChanges = false
) {
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
      <tbody key={v4()}>
        {buildRows(
          algorithmSteps,
          functionBodyRow,
          buildOnlyCurrentRowWithChanges ? algorithmSteps.currentStepIndex : 0
        )}
      </tbody>
    </>
  );
}

function chooseTableTypeAndRender(algorithmSteps) {
  if (algorithmSteps.algorithmType === AlgorithmType.BFS)
    return (
      <table className="graph-table">
        {buildTableContent(algorithmSteps, buildBFSHead, buildBFSRowCells)}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.DFS)
    return (
      <table className="graph-table">
        {buildTableContent(
          algorithmSteps,
          buildDFSHead,
          buildDFSRowCells,
          true
        )}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.PRIM)
    return (
      <table className="graph-table">
        {buildTableContent(algorithmSteps, buildPrimHead, buildPrimRowCells)}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.QBBF)
    return (
      <table className="graph-table">
        {buildTableContent(algorithmSteps, buildQBBFHead, buildQBBFRowCells)}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.DIJKSTRA)
    return (
      <table className="graph-table">
        {buildTableContent(
          algorithmSteps,
          buildDijkstraHead,
          buildDijkstraRowCells
        )}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.TOPO)
    return (
      <table className="graph-table">
        {buildTableContent(algorithmSteps, buildTOPOHead, buildTOPORowCells)}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.TOPO_DFS)
    return (
      <table className="graph-table">
        {buildTableContent(
          algorithmSteps,
          buildTOPOWithDFSHead,
          buildTOPOWithDFSRowCells
        )}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.KRUSKAL)
    return (
      <table className="graph-table">
        {buildTableContent(
          algorithmSteps,
          buildKruskalHead,
          buildKruskalRowCells
        )}
      </table>
    );
  else if (algorithmSteps.algorithmType === AlgorithmType.FW)
    return (
      <>
        <table className="graph-table">
          {buildTableContent(
            algorithmSteps,
            buildFWIndexTableHead,
            buildFWIndexTableRowCells,
            true
          )}
        </table>
        <table className="second-graph-table">
          {buildFWTable(algorithmSteps)}
        </table>
      </>
    );
  else return <table className="graph-table">{}</table>;
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
    return <>{chooseTableTypeAndRender(algorithmSteps)}</>;
  }
}

export { buildTable as default };
