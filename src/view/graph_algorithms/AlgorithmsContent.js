import React from "react";
import PropTypes from "prop-types";
import DrawingBoard from "./DrawingBoard";
import GraphForm from "./GraphForm";
import GraphCommunicationButtons from "./GraphCommunicationButtons";
import { Color, Graph, Position, Vertex } from "./utils/Graph";
import "./AlgorithmsContent.scss";
import GraphService from "../../_services/GraphService";
import Utilities from "../../utils/Utilities";

class AlgorithmsContent extends React.Component {
  constructor(props) {
    super(props);

    this.normalGraph = new Graph();
    this.directedGraph = new Graph(true);
    if (this.props.directedGraph && this.props.normalGraph) {
      this.normalGraph.noOfVertices = this.props.normalGraph.noOfVertices;
      this.normalGraph.adjList = new Map(this.props.normalGraph.adjList);
      this.directedGraph.noOfVertices = this.props.directedGraph.noOfVertices;
      this.directedGraph.adjList = new Map(this.props.directedGraph.adjList);
    }
    this.state = {
      graphRadius: 15,
      indexOfSelectedVertex: -1,
      vertices: this.props.vertices ? Utilities.copy(this.props.vertices) : [],
      directed: false,
      algorithm: "",
      graph: this.normalGraph,
      selectedEdge: null,
      graphNames: [],
    };
    this.drawingArea = React.createRef();
    this.graphName = "";
    this.loadGraphName = "";
  }

  async componentDidMount() {
    this.setState({ graphNames: await GraphService.getLoadableGraphNames() });
  }

  isPositionInVertex(position, vertex) {
    return (
      Math.sqrt(
        (vertex.position.x - position.x) * (vertex.position.x - position.x) +
          (vertex.position.y - position.y) * (vertex.position.y - position.y)
      ) <= this.state.graphRadius
    );
  }

  isPositionOnWeightOfEdge(position, edge) {
    let weightPos = new Position(
      (this.state.vertices[edge.fromVertex].position.x +
        this.state.vertices[edge.toVertex].position.x) /
        2,
      (this.state.vertices[edge.fromVertex].position.y +
        this.state.vertices[edge.toVertex].position.y) /
        2
    );
    return (
      Math.sqrt(
        (weightPos.x - position.x) * (weightPos.x - position.x) +
          (weightPos.y - position.y) * (weightPos.y - position.y)
      ) <= 15
    );
  }

  isPositionOnWeightOfSideEdge(position, edge) {
    let angle =
      Math.atan2(
        this.state.vertices[edge.toVertex].position.y -
          this.state.vertices[edge.fromVertex].position.y,
        this.state.vertices[edge.toVertex].position.x -
          this.state.vertices[edge.fromVertex].position.x
      ) +
      Math.PI / 2;
    let newBeg = new Position(
      this.state.vertices[edge.fromVertex].position.x +
        Math.cos(angle) * this.state.graphRadius,
      this.state.vertices[edge.fromVertex].position.y +
        Math.sin(angle) * this.state.graphRadius
    );
    let newEnd = new Position(
      this.state.vertices[edge.toVertex].position.x +
        Math.cos(angle) * this.state.graphRadius,
      this.state.vertices[edge.toVertex].position.y +
        Math.sin(angle) * this.state.graphRadius
    );

    let weightPos = new Position(
      (newBeg.x + newEnd.x) / 2,
      (newBeg.y + newEnd.y) / 2
    );
    return (
      Math.sqrt(
        (weightPos.x - position.x) * (weightPos.x - position.x) +
          (weightPos.y - position.y) * (weightPos.y - position.y)
      ) <= 15
    );
  }

  getClickedEdge(position) {
    for (let i = 0; i < this.state.vertices.length; ++i) {
      for (let j = 0; j < this.state.graph.adjList.get(i).length; ++j) {
        if (
          this.state.directed &&
          this.state.graph.isTwoWayEdgeBetweenVertices(
            this.state.graph.adjList.get(i)[j].fromVertex,
            this.state.graph.adjList.get(i)[j].toVertex
          )
        ) {
          if (
            this.isPositionOnWeightOfSideEdge(
              position,
              this.state.graph.adjList.get(i)[j]
            )
          )
            return { from: i, to: this.state.graph.adjList.get(i)[j].toVertex };
        } else if (
          this.isPositionOnWeightOfEdge(
            position,
            this.state.graph.adjList.get(i)[j]
          )
        ) {
          return { from: i, to: this.state.graph.adjList.get(i)[j].toVertex };
        }
      }
    }
    return null;
  }

  getIndexOfClickedVertex(position) {
    for (let i = 0; i < this.state.vertices.length; ++i) {
      if (this.isPositionInVertex(position, this.state.vertices[i])) return i;
    }
    return -1;
  }

  doesNewVertexIntersectAnyVertex(position) {
    for (let i = 0; i < this.state.vertices.length; ++i) {
      if (
        Math.sqrt(
          (this.state.vertices[i].position.x - position.x) *
            (this.state.vertices[i].position.x - position.x) +
            (this.state.vertices[i].position.y - position.y) *
              (this.state.vertices[i].position.y - position.y)
        ) <=
        2 * this.state.graphRadius
      ) {
        return true;
      }
    }
    return false;
  }

  canPlaceNewVertex(position) {
    return (
      this.getIndexOfClickedVertex(position) === -1 &&
      !this.doesNewVertexIntersectAnyVertex(position)
    );
  }

  deselectSelectedVertex() {
    const vertices = this.state.vertices;
    if (this.hasSelectedVertex())
      vertices[this.state.indexOfSelectedVertex].color = Color.PALE_RED;
    this.setState({ indexOfSelectedVertex: -1, vertices: vertices });
  }

  deselectSelectedEdge() {
    if (this.hasSelectedEdge())
      this.setEdgeColorInGraphs(this.state.selectedEdge, Color.BLACK);
    this.setState({ selectedEdge: null });
  }

  hasSelectedEdge() {
    return this.state.selectedEdge !== null;
  }

  hasSelectedVertex() {
    return this.state.indexOfSelectedVertex !== -1;
  }

  addNewEdge(indexOfToVertex) {
    this.directedGraph.addEdge(
      this.state.indexOfSelectedVertex,
      indexOfToVertex
    );
    this.normalGraph.addEdge(this.state.indexOfSelectedVertex, indexOfToVertex);
    this.setState({
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
    this.deselectSelectedVertex();
  }

  addNewVertex(position) {
    this.normalGraph.addVertex(this.state.vertices.length);
    this.directedGraph.addVertex(this.state.vertices.length);
    const vertices = this.state.vertices;
    vertices.push(new Vertex(position));
    this.setState({
      vertices: vertices,
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
    this.deselectSelectedEdge();
  }

  selectVertex(position) {
    let index = this.getIndexOfClickedVertex(position);
    this.selectVertexByIndex(index);
  }

  selectVertexByIndex(index) {
    this.deselectSelectedVertex();
    this.deselectSelectedEdge();
    if (index >= 0) {
      const vertices = this.state.vertices;
      vertices[index].color = Color.GREEN;
      this.setState({ indexOfSelectedVertex: index, vertices: vertices });
    }
  }

  setEdgeColorInGraphs(edge, color) {
    for (let i = 0; i < this.directedGraph.adjList.get(edge.from).length; ++i) {
      if (this.directedGraph.adjList.get(edge.from)[i].toVertex === edge.to) {
        this.directedGraph.adjList.get(edge.from)[i].color = color;
      }
    }
    for (let i = 0; i < this.normalGraph.adjList.get(edge.from).length; ++i) {
      if (this.normalGraph.adjList.get(edge.from)[i].toVertex === edge.to) {
        this.normalGraph.adjList.get(edge.from)[i].color = color;
      }
    }
    for (let i = 0; i < this.normalGraph.adjList.get(edge.to).length; ++i) {
      if (this.normalGraph.adjList.get(edge.to)[i].toVertex === edge.from) {
        this.normalGraph.adjList.get(edge.to)[i].color = color;
      }
    }
  }

  selectEdge(position) {
    this.deselectSelectedEdge();
    const edge = this.getClickedEdge(position);
    this.setEdgeColorInGraphs(edge, Color.RED);
    this.setState({
      selectedEdge: edge,
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
    if (this.hasSelectedVertex()) this.deselectSelectedVertex();
  }

  handleBoardOnClick(event) {
    this.drawingArea.current.focus();
    let canvasRect = this.drawingArea.current.getBoundingClientRect();
    let newPos = new Position(
      event.x - canvasRect.left,
      event.y - canvasRect.top
    );

    if (this.getClickedEdge(newPos) !== null) {
      this.selectEdge(newPos);
    } else if (
      this.hasSelectedVertex() &&
      this.getIndexOfClickedVertex(newPos) !== -1 &&
      this.getIndexOfClickedVertex(newPos) !== this.state.indexOfSelectedVertex
    ) {
      this.addNewEdge(this.getIndexOfClickedVertex(newPos));
    } else if (this.getIndexOfClickedVertex(newPos) !== -1) {
      this.selectVertex(newPos);
    } else if (this.canPlaceNewVertex(newPos)) {
      if (this.hasSelectedVertex()) {
        this.deselectSelectedVertex();
      } else if (this.hasSelectedEdge()) {
        this.deselectSelectedEdge();
      } else {
        this.addNewVertex(
          new Position(event.x - canvasRect.left, event.y - canvasRect.top)
        );
      }
    } else if (this.hasSelectedVertex()) {
      this.deselectSelectedVertex();
    } else if (this.hasSelectedEdge()) {
      this.deselectSelectedEdge();
    }
  }

  deleteSelectedVertex() {
    const vertices = this.state.vertices;
    vertices.splice(this.state.indexOfSelectedVertex, 1);
    this.directedGraph.removeVertex(this.state.indexOfSelectedVertex);
    this.normalGraph.removeVertex(this.state.indexOfSelectedVertex);
    this.setState({
      indexOfSelectedVertex: -1,
      vertices: vertices,
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
  }

  deleteSelectedEdge() {
    if (
      !this.directedGraph.isTwoWayEdgeBetweenVertices(
        this.state.selectedEdge.from,
        this.state.selectedEdge.to
      )
    )
      this.normalGraph.removeEdgeBetweenVertices(
        this.state.selectedEdge.from,
        this.state.selectedEdge.to
      );
    if (!this.state.directed) {
      this.directedGraph.directed = false;
    }
    this.directedGraph.removeEdgeBetweenVertices(
      this.state.selectedEdge.from,
      this.state.selectedEdge.to
    );
    if (!this.state.directed) {
      this.directedGraph.directed = true;
    }
    this.setState({
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
    this.deselectSelectedEdge();
  }

  deleteLastPlacedVertex() {
    const vertices = this.state.vertices;
    this.directedGraph.removeVertex(this.state.vertices.length - 1);
    this.normalGraph.removeVertex(this.state.vertices.length - 1);
    vertices.pop();
    this.setState({
      vertices: vertices,
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
  }

  handleBoardOnDelete() {
    if (this.hasSelectedVertex()) {
      this.deleteSelectedVertex();
    } else if (this.hasSelectedEdge()) {
      this.deleteSelectedEdge();
    } else if (this.state.vertices.length !== 0) {
      this.deleteLastPlacedVertex();
    }
  }

  handleBoardOnKeydown(event) {
    if (event.key === "Delete") {
      this.handleBoardOnDelete();
    }
  }

  handleDirectedChange(event) {
    this.setState({
      algorithm: "",
      directed: event.target.checked,
      graph: event.target.checked ? this.directedGraph : this.normalGraph,
    });
    this.deselectSelectedVertex();
    this.deselectSelectedEdge();
  }

  handleChooseAlgorithm(event) {
    this.setState({ algorithm: event.target.value });
    this.deselectSelectedVertex();
    this.deselectSelectedEdge();
  }

  handleChangeSelectedVertex(event) {
    this.deselectSelectedVertex();
    this.deselectSelectedEdge();
    this.selectVertexByIndex(Number(event.target.value));
  }

  changeWeightOfSelectedEdge(newWeight) {
    if (!isNaN(newWeight)) {
      this.normalGraph.changeWeight(
        this.state.selectedEdge.from,
        this.state.selectedEdge.to,
        newWeight
      );
      this.directedGraph.changeWeight(
        this.state.selectedEdge.from,
        this.state.selectedEdge.to,
        newWeight
      );
      this.deselectSelectedEdge();
    }
    this.setState({
      graph: this.state.directed ? this.directedGraph : this.normalGraph,
    });
  }

  async handleRunButtonClicked(event) {
    if (this.state.algorithm === "") {
      alert("Please select an algorithm!");
    } else if (
      ["bfs", "kruskal", "prim", "dijkstra", "qbbf"].includes(
        this.state.algorithm
      ) &&
      this.state.indexOfSelectedVertex === -1
    ) {
      alert("This algorithm needs a starting vertex. Please select one!");
    } else {
      let response = await GraphService.runAlgorithm(
        this.state.algorithm,
        this.state.graph,
        this.state.indexOfSelectedVertex
      );
      if (response.err) {
        alert(response.err);
      } else {
        this.deselectSelectedVertex();
        this.props.handleRunResult(
          Utilities.copy(this.state.vertices),
          Utilities.copy({
            directed: this.state.graph.directed,
            noOfVertices: this.state.graph.noOfVertices,
            adjList: Array.from(this.state.graph.adjList),
          }),
          response,
          Utilities.copy({
            directed: this.normalGraph.directed,
            noOfVertices: this.normalGraph.noOfVertices,
            adjList: Array.from(this.normalGraph.adjList),
          }),
          Utilities.copy({
            directed: this.directedGraph.directed,
            noOfVertices: this.directedGraph.noOfVertices,
            adjList: Array.from(this.directedGraph.adjList),
          })
        );
      }
    }
  }

  handleGraphNameChange(e) {
    this.graphName = e.target.value;
  }

  handleLoadSelectChange(e) {
    this.loadGraphName = e.target.value;
  }

  async handleSaveButtonClicked(e) {
    if (this.graphName === "") {
      alert("Need a graph name to save!");
    } else {
      await GraphService.saveGraph(
        this.normalGraph,
        this.directedGraph,
        this.state.vertices,
        this.graphName
      ).then((response) => {
        const result = response.json();
        if (result.success) {
          this.componentDidMount();
        } else {
          alert(result.err);
        }
      });
    }
  }

  async handleLoadButtonClicked(e) {
    if (this.loadGraphName === "") alert("You have to choose a graph to load!");
    else {
      const result = await GraphService.getGraph(this.loadGraphName);
      if (result !== null) {
        this.normalGraph = result.normalGraph;
        this.directedGraph = result.directedGraph;
        this.setState({
          graph: this.state.directed ? this.directedGraph : this.normalGraph,
          vertices: result.vertices,
        });
      } else alert("Graph not found in database!");
    }
  }

  render() {
    return React.createElement(
      "div",
      { className: "algorithms-content" },
      <>
        <div className="algorithms-content-drawing-inline">
          <div className="algorithms-content-drawing">
            <DrawingBoard
              drawingArea={this.drawingArea}
              graphRadius={this.state.graphRadius}
              vertices={this.state.vertices}
              indexOfSelectedVertex={this.state.indexOfSelectedVertex}
              graph={this.state.graph}
              selectedEdge={this.state.selectedEdge}
              handleDeleteButtonOnClick={() => {
                this.handleBoardOnDelete();
              }}
              handleOnClick={(e) => {
                this.handleBoardOnClick(e);
              }}
              handleOnKeydown={(e) => {
                this.handleBoardOnKeydown(e);
              }}
              changeWeightOfSelectedEdge={(e) => {
                this.changeWeightOfSelectedEdge(e);
              }}
            />
          </div>
          <div className="algorithms-content-form">
            <GraphForm
              noOfVertices={this.state.vertices.length}
              directed={this.state.directed}
              selectedVertex={this.state.indexOfSelectedVertex}
              selectedAlgorithm={this.state.algorithm}
              handleDirectedChange={(e) => {
                this.handleDirectedChange(e);
              }}
              handleChooseAlgorithm={(e) => {
                this.handleChooseAlgorithm(e);
              }}
              handleSelectedVertex={(e) => {
                this.handleChangeSelectedVertex(e);
              }}
              handleRunButtonClicked={(e) => {
                this.handleRunButtonClicked(e);
              }}
            />
          </div>
        </div>
        <div className="algorithms-content-communication-buttons">
          <GraphCommunicationButtons
            graphNames={this.state.graphNames}
            handleGraphNameChange={(e) => this.handleGraphNameChange(e)}
            handleSaveButtonClicked={(e) => this.handleSaveButtonClicked(e)}
            handleLoadSelectChange={(e) => this.handleLoadSelectChange(e)}
            handleLoadButtonClicked={(e) => this.handleLoadButtonClicked(e)}
          />
        </div>
      </>
    );
  }
}

AlgorithmsContent.propTypes = {
  className: PropTypes.string,
};

AlgorithmsContent.defaultProps = {
  className: "",
};

export { AlgorithmsContent as default };
