import React from "react";
import AlgorithmsContent from "./AlgorithmsContent";
import UsersGuidePopup from "./UsersGuidePopup";
import GraphAlgorithmStructogram from "./GraphAlgorithmStructogram";
import GraphPlayAlgorithm from "./GraphPlayAlgorithm";
import { Graph } from "./utils/Graph";
import Utilities from "../../utils/Utilities";

import "./GraphContent.scss";

class GraphContent extends React.Component {
  constructor(props) {
    super(props);
    this.savedNormalGraph = null;
    this.savedDirectedGraph = null;
    this.savedVertices = null;
    this.state = {
      vertices: null,
      graph: null,
      playableContent: null,
      showUsersGuidePopup: false,
      showStuctogram: false,
    };
  }

  toggleUsersGuidePopup() {
    this.setState({
      showUsersGuidePopup: !this.state.showUsersGuidePopup,
    });
  }

  toggleStuctogramPopup() {
    this.setState({
      showStuctogram: !this.state.showStuctogram,
    });
  }

  convertToValue(value) {
    return value === null ? Infinity : value;
  }

  setUpPlayableContent(playableContent) {
    for (let i = 0; i < playableContent.steps.length; ++i) {
      for (let j = 0; j < playableContent.steps[i].vertices.length; ++j) {
        playableContent.steps[i].vertices[j].vertexNumber = this.savedVertices[
          j
        ].vertexNumber;
        playableContent.steps[i].vertices[j].position = this.savedVertices[
          j
        ].position;
        if (playableContent.steps[i].vertices[j].parent !== null) {
          playableContent.steps[i].vertices[j].parent = this.savedVertices[
            playableContent.steps[i].vertices[j].parent
          ].vertexNumber;
        }
        playableContent.steps[i].vertices[j].depth = this.convertToValue(
          playableContent.steps[i].vertices[j].depth
        );
        playableContent.steps[i].vertices[j].cost = this.convertToValue(
          playableContent.steps[i].vertices[j].cost
        );
        playableContent.steps[i].vertices[j].distance = this.convertToValue(
          playableContent.steps[i].vertices[j].distance
        );
      }

      if (playableContent.steps[i].kruskalSets) {
        for (let j = 0; j < playableContent.steps[i].kruskalSets.length; ++j) {
          for (
            let k = 0;
            k < playableContent.steps[i].kruskalSets[j].length;
            ++k
          ) {
            playableContent.steps[i].kruskalSets[j][k] = this.savedVertices[
              playableContent.steps[i].kruskalSets[j][k]
            ].vertexNumber;
          }
        }
      }
      if (playableContent.steps[i].sortedEdges) {
        for (
          let j = 0;
          j < playableContent.steps[i].sortedEdges.items.length;
          ++j
        ) {
          playableContent.steps[i].sortedEdges.items[
            j
          ].fromVertex = this.savedVertices[
            playableContent.steps[i].sortedEdges.items[j].fromVertex
          ].vertexNumber;

          playableContent.steps[i].sortedEdges.items[
            j
          ].toVertex = this.savedVertices[
            playableContent.steps[i].sortedEdges.items[j].toVertex
          ].vertexNumber;
        }
      }
      if (playableContent.steps[i].chosenEdges) {
        for (let j = 0; j < playableContent.steps[i].chosenEdges.length; ++j) {
          playableContent.steps[i].chosenEdges[
            j
          ].fromVertex = this.savedVertices[
            playableContent.steps[i].chosenEdges[j].fromVertex
          ].vertexNumber;

          playableContent.steps[i].chosenEdges[j].toVertex = this.savedVertices[
            playableContent.steps[i].chosenEdges[j].toVertex
          ].vertexNumber;
        }
      }
      if (playableContent.steps[i].topologicalOrder) {
        for (
          let j = 0;
          j < playableContent.steps[i].topologicalOrder.length;
          ++j
        ) {
          playableContent.steps[i].topologicalOrder[j] = this.savedVertices[
            playableContent.steps[i].topologicalOrder[j]
          ].vertexNumber;
        }
      }
      if (playableContent.steps[i].stack) {
        for (let j = 0; j < playableContent.steps[i].stack.items.length; ++j) {
          playableContent.steps[i].stack.items[j] = this.savedVertices[
            playableContent.steps[i].stack.items[j]
          ].vertexNumber;
        }
      }
      if (playableContent.steps[i].queue) {
        for (let j = 0; j < playableContent.steps[i].queue.items.length; ++j) {
          playableContent.steps[i].queue.items[j] = this.savedVertices[
            playableContent.steps[i].queue.items[j]
          ].vertexNumber;
        }
      }
      if (playableContent.steps[i].distanceMatrix) {
        for (
          let j = 0;
          j < playableContent.steps[i].distanceMatrix.length;
          ++j
        ) {
          for (
            let k = 0;
            k < playableContent.steps[i].distanceMatrix[j].length;
            ++k
          ) {
            if (playableContent.steps[i].distanceMatrix[j][k] === null) {
              playableContent.steps[i].distanceMatrix[j][k] = Infinity;
            }
          }
        }
      }
      if (playableContent.steps[i].parentMatrix) {
        for (let j = 0; j < playableContent.steps[i].parentMatrix.length; ++j) {
          for (
            let k = 0;
            k < playableContent.steps[i].parentMatrix[j].length;
            ++k
          ) {
            if (playableContent.steps[i].parentMatrix[j][k] !== null) {
              playableContent.steps[i].parentMatrix[j][k] = this.savedVertices[
                playableContent.steps[i].parentMatrix[j][k]
              ].vertexNumber;
            }
          }
        }
      }
    }
  }

  handleBackToCreateGraph() {
    this.setState({
      vertices: null,
      graph: null,
      playableContent: null,
    });
  }

  handleRunResult(
    vertices,
    graph,
    playableContent,
    normalGraph,
    directedGraph
  ) {
    this.savedVertices = Utilities.copy(vertices);
    this.savedDirectedGraph = new Graph();
    this.savedDirectedGraph.directed = directedGraph.directed;
    this.savedDirectedGraph.noOfVertices = directedGraph.noOfVertices;
    this.savedDirectedGraph.adjList = directedGraph.adjList;

    this.savedNormalGraph = new Graph();
    this.savedNormalGraph.directed = normalGraph.directed;
    this.savedNormalGraph.noOfVertices = normalGraph.noOfVertices;
    this.savedNormalGraph.adjList = normalGraph.adjList;

    const copiedGraph = new Graph();
    copiedGraph.directed = graph.directed;
    copiedGraph.noOfVertices = graph.noOfVertices;
    copiedGraph.adjList = new Map(graph.adjList);

    this.setUpPlayableContent(playableContent);

    this.setState({
      vertices: vertices,
      graph: copiedGraph,
      playableContent: playableContent,
    });
  }

  handleNextStep() {
    if (
      this.state.playableContent.currentStepIndex <
      this.state.playableContent.steps.length - 1
    ) {
      const playableContent = this.state.playableContent;
      ++playableContent.currentStepIndex;
      this.setState({
        playableContent: playableContent,
      });
    }
  }

  handlePrevStep() {
    if (this.state.playableContent.currentStepIndex > 0) {
      const playableContent = this.state.playableContent;
      --playableContent.currentStepIndex;
      this.setState({
        playableContent: playableContent,
      });
    }
  }

  renderContent() {
    return this.state.playableContent !== null &&
      this.state.vertices !== null &&
      this.state.graph !== null ? (
      <>
        <div className="back-to-create-button">
          <input
            type={"button"}
            id={"graph-content-back-button-to-create-graph"}
            value={"Stuctogram"}
            onClick={this.toggleStuctogramPopup.bind(this)}
          />
          <input
            type={"button"}
            id={"graph-content-back-button-to-create-graph"}
            value={"Back to create"}
            onClick={(e) => {
              this.handleBackToCreateGraph();
            }}
          />
        </div>
        <GraphPlayAlgorithm
          vertices={
            this.state.playableContent.steps[
              this.state.playableContent.currentStepIndex
            ].vertices
          }
          graph={this.state.graph}
          algorithmSteps={this.state.playableContent}
          handleNextStep={() => this.handleNextStep()}
          handlePrevStep={() => this.handlePrevStep()}
        />
        {this.state.showStuctogram ? (
          <GraphAlgorithmStructogram
            algorithmType={this.state.playableContent.algorithmType}
            closePopup={this.toggleStuctogramPopup.bind(this)}
          />
        ) : null}
      </>
    ) : (
      <>
        <div className="users-guide-button">
          <input
            type={"button"}
            id={"graph-content-users-guide-button"}
            value={"User's Guide"}
            onClick={this.toggleUsersGuidePopup.bind(this)}
          />
        </div>
        <AlgorithmsContent
          vertices={this.savedVertices}
          directedGraph={this.savedDirectedGraph}
          normalGraph={this.savedNormalGraph}
          handleRunResult={(
            vertices,
            graph,
            playableContent,
            savedNormalGraph,
            savedDirectedGraph
          ) => {
            this.handleRunResult(
              vertices,
              graph,
              playableContent,
              savedNormalGraph,
              savedDirectedGraph
            );
          }}
        />
        {this.state.showUsersGuidePopup ? (
          <UsersGuidePopup closePopup={this.toggleUsersGuidePopup.bind(this)} />
        ) : null}
      </>
    );
  }

  render() {
    return <>{this.renderContent()}</>;
  }
}

export { GraphContent as default };
