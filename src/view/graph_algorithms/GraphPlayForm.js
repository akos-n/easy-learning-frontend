import React from "react";

import "./GraphPlayForm.scss";

class GraphPlayForm extends React.Component {
  render() {
    return (
      <div className="graph-play-form">
        <input type="button" value="<" onClick={this.props.handlePrev} />
        <input type="button" value=">" onClick={this.props.handleNext} />
      </div>
    );
  }
}

export { GraphPlayForm as default };
