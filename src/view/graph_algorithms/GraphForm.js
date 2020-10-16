import React from "react";
import PropTypes from "prop-types";
import "./GraphForm.scss";

class GraphForm extends React.Component {
  constructor(props) {
    super(props);
    this.graphForm = React.createRef();
  }

  buildAlgorithmsList() {
    if (this.props.directed) {
      return [
        <option key={0} value="bfs">
          Breadth-First Search
        </option>,
        <option key={1} value="dfs">
          Depth-First Search
        </option>,
        <option key={2} value="topo">
          Topological order
        </option>,
        <option key={3} value="topo-dfs">
          Topological order with Depth-First Search
        </option>,
        <option key={4} value="dijkstra">
          Dijkstra's Shortest Path First algorithm
        </option>,
        <option key={5} value="qbbf">
          Queue-based Bellman-Ford algorithm (shortest path)
        </option>,
        <option key={6} value="fw">
          Floyd-Warshall algorithm (shortest path)
        </option>,
      ];
    } else {
      return [
        <option key={1} value="kruskal">
          Kruskal algorithm for minimum-spanning-tree
        </option>,
        <option key={2} value="prim">
          Prim's algorithm for minimum-spanning-tree
        </option>,
        <option key={3} value="fw">
          Floyd-Warshall algorithm (shortest path)
        </option>,
      ];
    }
  }

  buildSelectedVertexOptions() {
    let options = [];
    for (let i = 0; i < this.props.noOfVertices; ++i) {
      options.push(
        React.createElement(
          "option",
          {
            key: i,
            value: i,
          },
          i
        )
      );
    }
    return options;
  }

  render() {
    return (
      <div className="graph-form" ref={this.graphForm}>
        <label className="checkbox-label">
          Directed:
          <input
            id="change-directed"
            type="checkbox"
            defaultChecked={this.props.directed}
            onChange={this.props.handleDirectedChange}
          />
          <span className="slider">
            <span className="circle"></span>
          </span>
        </label>
        <select
          id="graph-form-algorithm-choices"
          value={this.props.selectedAlgorithm}
          onChange={(e) => {
            this.props.handleChooseAlgorithm(e);
          }}
        >
          <option value={""} disabled hidden>
            Select an algorithm
          </option>
          {this.buildAlgorithmsList()}
        </select>
        <select
          id="graph-form-selected-vertex"
          value={this.props.selectedVertex}
          onChange={(e) => {
            this.props.handleSelectedVertex(e);
          }}
        >
          <option value={-1} disabled hidden>
            Select starting vertex
          </option>
          {this.buildSelectedVertexOptions()}
        </select>
        <input
          type="button"
          value="Run"
          onClick={this.props.handleRunButtonClicked}
        />
      </div>
    );
  }
}

GraphForm.propTypes = {
  noOfVertices: PropTypes.number,
};

GraphForm.defaultProps = {
  noOfVertices: 0,
};

export { GraphForm as default };
