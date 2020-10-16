import GraphBaseDrawingBoard from "./GraphBaseDrawingBoard";
import { Color } from "./utils/Graph";

import "./DrawingBoard.scss";

class GraphPlayDrawingBoard extends GraphBaseDrawingBoard {
  hasChosenEdges() {
    return (
      this.props.algorithmSteps.steps[
        this.props.algorithmSteps.currentStepIndex
      ].chosenEdges !== null
    );
  }

  isEdgeInChosenEdges(edge) {
    if (!this.hasChosenEdges()) return true;
    for (let currentEdge of this.props.algorithmSteps.steps[
      this.props.algorithmSteps.currentStepIndex
    ].chosenEdges) {
      if (
        edge.toVertex === currentEdge.toVertex &&
        edge.fromVertex === currentEdge.fromVertex &&
        edge.weight === currentEdge.weight
      ) {
        return true;
      }
    }
    return false;
  }

  drawEdges() {
    for (let i = 0; i < this.props.vertices.length; ++i) {
      for (let j = 0; j < this.props.graph.adjList.get(i).length; ++j) {
        let currentDrawColor = this.props.graph.adjList.get(i)[j].color;
        if (
          this.hasChosenEdges() &&
          this.isEdgeInChosenEdges(this.props.graph.adjList.get(i)[j])
        ) {
          if (currentDrawColor === Color.BLACK)
            currentDrawColor = Color.DARK_RED;
          this.ctx.lineWidth = 3;
        }
        this.ctx.fillStyle = currentDrawColor;
        this.ctx.strokeStyle = currentDrawColor;
        if (
          this.props.graph.directed &&
          this.props.graph.isTwoWayEdgeBetweenVertices(
            this.props.graph.adjList.get(i)[j].fromVertex,
            this.props.graph.adjList.get(i)[j].toVertex
          )
        ) {
          this.drawSideLine(
            this.props.vertices[this.props.graph.adjList.get(i)[j].fromVertex]
              .position,
            this.props.vertices[this.props.graph.adjList.get(i)[j].toVertex]
              .position,
            this.props.graph.adjList.get(i)[j].weight
          );
        } else {
          this.drawLine(
            this.props.vertices[this.props.graph.adjList.get(i)[j].fromVertex]
              .position,
            this.props.vertices[this.props.graph.adjList.get(i)[j].toVertex]
              .position
          );
          this.drawWeightOfEdge(
            this.props.vertices[this.props.graph.adjList.get(i)[j].fromVertex]
              .position,
            this.props.vertices[this.props.graph.adjList.get(i)[j].toVertex]
              .position,
            this.props.graph.adjList.get(i)[j].weight
          );
        }
        this.ctx.fillStyle = Color.BLACK;
        this.ctx.strokeStyle = Color.BLACK;
        this.ctx.lineWidth = 1;
        this.ctx.fontWeight = "normal";
      }
    }
  }
}

export { GraphPlayDrawingBoard as default };
