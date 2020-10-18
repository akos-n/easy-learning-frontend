import React from "react";

import "./BasePopup.scss";
import "./GraphAlgorithmStructogram.scss";

import BFS from "./resources/BFS.png";
import DFS from "./resources/DFS.png";
import DFS_VISIT from "./resources/DFS_VISIT.png";
import TOPO from "./resources/TOPO.png";
import TOPO_DFS from "./resources/TOPO_DFS.png";
import TOPO_DFS_VISIT from "./resources/TOPO_DFS_VISIT.png";
import KRUSKAL from "./resources/KRUSKAL.png";
import PRIM from "./resources/PRIM.png";
import DIJKSTRA from "./resources/DIJKSTRA.png";
import QBBF from "./resources/QBBF.png";
import FW from "./resources/FW.png";

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

class GraphAlgorithmStructogram extends React.Component {
  getImageForAlgorithmType() {
    switch (this.props.algorithmType) {
      case AlgorithmType.BFS:
        return (
          <img src={BFS} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.DFS:
        return (
          <>
            <img src={DFS} alt={this.props.algorithmType} max-width="100%" />
            <img
              src={DFS_VISIT}
              alt={this.props.algorithmType + " Visit"}
              max-width="100%"
            />
          </>
        );
      case AlgorithmType.TOPO:
        return (
          <img src={TOPO} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.TOPO_DFS:
        return (
          <>
            <img
              src={TOPO_DFS}
              alt={this.props.algorithmType}
              max-width="100%"
            />
            <img
              src={TOPO_DFS_VISIT}
              alt={this.props.algorithmType + " Visit"}
              max-width="100%"
            />
          </>
        );
      case AlgorithmType.KRUSKAL:
        return (
          <img src={KRUSKAL} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.PRIM:
        return (
          <img src={PRIM} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.DIJKSTRA:
        return (
          <img src={DIJKSTRA} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.QBBF:
        return (
          <img src={QBBF} alt={this.props.algorithmType} max-width="100%" />
        );
      case AlgorithmType.FW:
        return <img src={FW} alt={this.props.algorithmType} max-width="100%" />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={"popup"}>
        <div className={"popup-inner"}>
          <div className={"popup-inner-header"}>
            <input
              type={"button"}
              value={"X"}
              onClick={this.props.closePopup}
            />
          </div>
          <div
            className={"popup-inner-body"}
            id="graph-algorithm-structogram-popup-inner-body"
          >
            {this.getImageForAlgorithmType()}
          </div>
        </div>
      </div>
    );
  }
}

export { GraphAlgorithmStructogram as default };
