import React from "react";
import GraphPlayDrawingBoard from "./GraphPlayDrawingBoard";
import GraphAlgorithmTable from "./GraphAlgorithmTable";
import GraphAlgorithmDescription from "./GraphAlgorithmDescription";
import GraphPlayForm from "./GraphPlayForm";

import "./GraphPlayAlgorithm.scss";

class GraphPlayAlgorithm extends React.Component {
  constructor(props) {
    super(props);
    this.drawingArea = React.createRef();
    this.state = {
      graphRadius: 15,
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: "graph-play-algorithm" },
      <>
        <div className="graph-play-algorithm-description">
          <GraphAlgorithmDescription
            algorithmType={this.props.algorithmSteps.algorithmType}
            algorithmDescription={
              this.props.algorithmSteps.algorithmDescription
            }
          />
        </div>
        <div className="graph-play-algorithm-drawing">
          <GraphPlayDrawingBoard
            drawingArea={this.drawingArea}
            graphRadius={this.state.graphRadius}
            vertices={this.props.vertices}
            graph={this.props.graph}
            algorithmSteps={this.props.algorithmSteps}
          />
        </div>
        <div className="graph-play-algorithm-table">
          <GraphAlgorithmTable
            vertices={this.props.vertices}
            algorithmSteps={this.props.algorithmSteps}
          />
        </div>
        <div className="graph-play-algorithm-form">
          <GraphPlayForm
            handleNext={(e) => {
              this.props.handleNextStep();
            }}
            handlePrev={(e) => {
              this.props.handlePrevStep();
            }}
          />
        </div>
      </>
    );
  }
}

export { GraphPlayAlgorithm as default };
