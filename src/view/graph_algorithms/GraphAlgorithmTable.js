import React from "react";
import buildTable from "./utils/GraphTableBuilder";

import "./GraphAlgorithmTable.scss";

class GraphAlgorithmTable extends React.Component {
  render() {
    console.log(buildTable(this.props.algorithmSteps));
    return (
      <div className="algorithm-table">
        {buildTable(this.props.algorithmSteps)}
      </div>
    );
  }
}

export { GraphAlgorithmTable as default };
