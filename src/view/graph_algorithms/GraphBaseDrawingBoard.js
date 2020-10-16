import React from "react";
import { Color, Position } from "./utils/Graph";

class GraphBaseDrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: 0,
        height: 0,
        resized: false,
      },
    };
    this.containerRef = React.createRef();
    this.inputWeightRef = React.createRef();
  }

  onWindowResize(e) {
    if (this.containerRef.current)
      this.setState({
        dimensions: {
          width: this.containerRef.current.offsetWidth,
          height: this.containerRef.current.offsetHeight,
        },
      });
  }

  drawTouchingTimesOfVertex(vertex) {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.setContextFontSize(16);
    if (vertex.hasOwnProperty("discoveryTime")) {
      if (vertex.discoveryTime !== 0) {
        this.ctx.fillText(
          vertex.discoveryTime,
          vertex.position.x - 15,
          vertex.position.y - 20
        );
      }
    }
    if (vertex.hasOwnProperty("finishingTime")) {
      if (vertex.finishingTime !== 0) {
        this.ctx.fillText(
          vertex.finishingTime,
          vertex.position.x + 15,
          vertex.position.y - 20
        );
      }
    }
    this.setContextFontSize();
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "alphabetic";
  }

  drawNumberOfVertex(numOfVertex, vertex) {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.setContextFontSize(20);

    this.ctx.fillText(numOfVertex, vertex.position.x, vertex.position.y);

    this.setContextFontSize();
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "alphabetic";
  }

  drawVertices() {
    for (let i = 0; i < this.props.vertices.length; ++i) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.arc(
        this.props.vertices[i].position.x,
        this.props.vertices[i].position.y,
        this.props.graphRadius,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = this.props.vertices[i].color;
      this.ctx.fill();
      this.ctx.fillStyle = Color.BLACK;
      this.drawNumberOfVertex(i, this.props.vertices[i]);
      this.drawTouchingTimesOfVertex(this.props.vertices[i]);
    }
  }

  drawArrow(begPos, endPos, radius = 7.5) {
    let xCenter;
    let yCenter;

    let angle;
    let x;
    let y;

    this.ctx.beginPath();

    angle = Math.atan2(endPos.y - begPos.y, endPos.x - begPos.x);
    xCenter = endPos.x - radius * Math.cos(angle);
    yCenter = endPos.y - radius * Math.sin(angle);

    x = radius * Math.cos(angle) + xCenter;
    y = radius * Math.sin(angle) + yCenter;
    this.ctx.moveTo(x, y);
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + xCenter;
    y = radius * Math.sin(angle) + yCenter;
    this.ctx.lineTo(x, y);

    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + xCenter;
    y = radius * Math.sin(angle) + yCenter;
    this.ctx.moveTo(x, y);
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + xCenter;
    y = radius * Math.sin(angle) + yCenter;
    this.ctx.lineTo(x, y);

    this.ctx.closePath();

    this.ctx.stroke();
  }

  drawLine(begPos, endPos) {
    this.ctx.beginPath();
    this.ctx.moveTo(begPos.x, begPos.y);
    this.ctx.lineTo(endPos.x, endPos.y);
    this.ctx.stroke();
    this.ctx.closePath();
    if (this.props.graph.directed) {
      this.drawArrow(begPos, endPos);
    }
  }

  setContextFontSize(px = 12) {
    let fontArgs = this.ctx.font.split(" ");
    this.ctx.font = px + "px " + fontArgs[fontArgs.length - 1];
  }

  drawWeightOfEdge(begPos, endPos, weight) {
    this.setContextFontSize(16);
    this.ctx.fillText(
      weight,
      (begPos.x + endPos.x) / 2,
      (begPos.y + endPos.y) / 2
    );
    this.setContextFontSize();
  }

  drawSideLine(begPos, endPos, weight = 0) {
    this.ctx.beginPath();
    let angle =
      Math.atan2(endPos.y - begPos.y, endPos.x - begPos.x) + Math.PI / 2;
    let newBeg = new Position(
      begPos.x + Math.cos(angle) * this.props.graphRadius,
      begPos.y + Math.sin(angle) * this.props.graphRadius
    );
    let newEnd = new Position(
      endPos.x + Math.cos(angle) * this.props.graphRadius,
      endPos.y + Math.sin(angle) * this.props.graphRadius
    );
    this.drawLine(newBeg, newEnd);
    this.ctx.stroke();
    this.drawWeightOfEdge(newBeg, newEnd, weight);
  }

  drawEdges() {
    for (let i = 0; i < this.props.vertices.length; ++i) {
      for (let j = 0; j < this.props.graph.adjList.get(i).length; ++j) {
        this.ctx.fillStyle = this.props.graph.adjList.get(i)[j].color;
        this.ctx.strokeStyle = this.props.graph.adjList.get(i)[j].color;
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
      }
    }
  }

  drawGraph() {
    this.drawVertices();
    this.drawEdges();
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.containerRef.current.offsetWidth,
        height: this.containerRef.current.offsetHeight,
      },
    });
    this.fitToContainer();
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.updateCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  fitToContainer() {
    this.props.drawingArea.current.width = this.state.dimensions.width;
    this.props.drawingArea.current.height = 420;
  }

  updateCanvas() {
    this.fitToContainer();
    this.ctx = this.props.drawingArea.current.getContext("2d");
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawGraph();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateCanvas();
  }

  render() {
    return (
      <div ref={this.containerRef} className="drawing-board">
        <canvas ref={this.props.drawingArea} />
      </div>
    );
  }
}

export { GraphBaseDrawingBoard as default };
