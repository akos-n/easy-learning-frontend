import React from "react";
import AlgorithmsContent from "./AlgorithmsContent";
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
    };
  }

  convertToValue(value) {
    return value === null ? Infinity : value;
  }

  setUpPlayableContent(playableContent) {
    for (let i = 0; i < playableContent.steps.length; ++i) {
      for (let j = 0; j < playableContent.steps[i].vertices.length; ++j) {
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
    for (let i = 0; i < vertices.length; ++i) {
      vertices[i].depth =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].depth;
      vertices[i].parent =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].parent;
      vertices[i].color =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].color;
      vertices[i].cost =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].cost;
      vertices[i].distance =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].distance;
      vertices[i].discoveryTime =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].discoveryTime;
      vertices[i].finishingTime =
        playableContent.steps[playableContent.currentStepIndex].vertices[
          i
        ].finishingTime;
    }

    this.setState({
      vertices: vertices,
      graph: copiedGraph,
      playableContent: playableContent,
    });
  }

  copyVerticesFromStep(stepIndex) {
    const vertices = this.state.vertices;
    for (let i = 0; i < vertices.length; ++i) {
      vertices[i].depth = this.convertToValue(
        this.state.playableContent.steps[stepIndex].vertices[i].depth
      );
      vertices[i].parent = this.state.playableContent.steps[stepIndex].vertices[
        i
      ].parent;
      vertices[i].color = this.state.playableContent.steps[stepIndex].vertices[
        i
      ].color;
      vertices[i].cost = this.convertToValue(
        this.state.playableContent.steps[stepIndex].vertices[i].cost
      );
      vertices[i].distance = this.convertToValue(
        this.state.playableContent.steps[stepIndex].vertices[i].distance
      );
      vertices[i].discoveryTime = this.state.playableContent.steps[
        stepIndex
      ].vertices[i].discoveryTime;
      vertices[i].finishingTime = this.state.playableContent.steps[
        stepIndex
      ].vertices[i].finishingTime;
    }
    this.setState({ vertices: vertices });
  }

  handleNextStep() {
    if (
      this.state.playableContent.currentStepIndex <
      this.state.playableContent.steps.length - 1
    ) {
      const playableContent = this.state.playableContent;
      this.copyVerticesFromStep(++playableContent.currentStepIndex);
      this.setState({
        playableContent: playableContent,
      });
    }
  }

  handlePrevStep() {
    if (this.state.playableContent.currentStepIndex > 0) {
      const playableContent = this.state.playableContent;
      this.copyVerticesFromStep(--playableContent.currentStepIndex);
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
            value={"Back to create"}
            onClick={(e) => {
              this.handleBackToCreateGraph();
            }}
          />
        </div>
        <GraphPlayAlgorithm
          vertices={this.state.vertices}
          graph={this.state.graph}
          algorithmSteps={this.state.playableContent}
          handleNextStep={() => this.handleNextStep()}
          handlePrevStep={() => this.handlePrevStep()}
        />
      </>
    ) : (
      <>
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
      </>
    );
  }

  render() {
    return <>{this.renderContent()}</>;
  }
}

export { GraphContent as default };
