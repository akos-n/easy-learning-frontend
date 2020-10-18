import React from "react";

class GraphAlgorithmDescription extends React.Component {
  render() {
    return (
      <>
        <div className="algorithms-description">
          <h1>{this.props.algorithmType}</h1>
          <p>{this.props.algorithmDescription}</p>
        </div>
      </>
    );
  }
}

export { GraphAlgorithmDescription as default };
