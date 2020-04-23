import React from "react";
import GraphBaseDrawingBoard from "./GraphBaseDrawingBoard";
import "./DrawingBoard.scss";

class DrawingBoard extends GraphBaseDrawingBoard {
  handleOnClick(event) {
    this.props.handleOnClick(event);
    this.updateCanvas();
  }

  handleInputWeightKeyDown(event) {
    if (event.key === "Enter") {
      this.props.changeWeightOfSelectedEdge(
        Number(this.inputWeightRef.current.value)
      );
    }
  }

  buildSelectedEdgeWeightInput() {
    if (this.props.selectedEdge !== null) {
      return [
        React.createElement(
          "label",
          {
            htmlFor: "graph-form-weight-input",
            key: "graph-form-weight-input-label",
          },
          "Weight of selected edge:"
        ),
        React.createElement("input", {
          type: "number",
          ref: this.inputWeightRef,
          id: "graph-form-weight-input",
          key: "graph-form-weight-input",
          width: window.innerWidth * 0.75,
          defaultValue: this.props.graph.getEdge(
            this.props.selectedEdge.from,
            this.props.selectedEdge.to
          ).weight,
          onKeyDown: (e) => {
            this.handleInputWeightKeyDown(e);
          },
        }),
      ];
    }
  }

  renderDeleteButton() {
    if (
      this.props.indexOfSelectedVertex !== -1 ||
      this.props.selectedEdge !== null
    ) {
      return (
        <div className={"drawing-board-delete-button"}>
          <input
            type={"button"}
            value={"Delete"}
            onClick={() => {
              this.props.handleDeleteButtonOnClick();
            }}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="drawing-board" ref={this.containerRef}>
        {this.renderDeleteButton()}
        <canvas
          ref={this.props.drawingArea}
          tabIndex={0}
          onClick={(e) => {
            this.handleOnClick(e.nativeEvent);
          }}
          onKeyDown={(e) => {
            this.props.handleOnKeydown(e.nativeEvent);
          }}
        />
        <div className="drawing-board-weight-of-edge">
          {this.buildSelectedEdgeWeightInput()}
        </div>
      </div>
    );
  }
}
export { DrawingBoard as default };
