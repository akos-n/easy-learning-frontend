import React from "react";
import { v4 } from "uuid";

import AuthService from "../../_services/AuthService";

import "./GraphCommunicationButtons.scss";

class GraphCommunicationButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadableGraphValue: -1,
    };
  }

  buildLoadOptions() {
    let options = [];
    if (this.props.graphNames.length !== 0) {
      for (let name of this.props.graphNames) {
        options.push(
          React.createElement(
            "option",
            {
              key: v4(),
              value: name,
            },
            name
          )
        );
      }
    }
    return options;
  }

  renderSaveButton() {
    if (AuthService.getCurrentUser() !== null) {
      return (
        <>
          <input
            type="text"
            id="graph-name-save"
            placeholder="Graph name to save"
            onChange={(e) => {
              this.props.handleGraphNameChange(e);
            }}
          />
          <input
            type="button"
            id="graph-save-button"
            value="Save"
            onClick={(e) => {
              this.props.handleSaveButtonClicked(e);
            }}
          />
        </>
      );
    } else return <></>;
  }

  handleLoadSelectChange(e) {
    this.setState({ loadableGraphValue: e.target.value });
    this.props.handleLoadSelectChange(e);
  }

  handleLoadButtonClicked(e) {
    this.setState({ loadableGraphValue: -1 });
    this.props.handleLoadButtonClicked(e);
    this.props.handleLoadSelectChange({ target: { value: -1 } });
  }

  render() {
    return (
      <>
        <div className="graph-auth-button">
          {this.renderSaveButton()}
          <select
            id="graph-auth-select-load"
            value={this.state.loadableGraphValue}
            onChange={(e) => {
              this.handleLoadSelectChange(e);
            }}
          >
            <option key={-1} value={-1} disabled hidden>
              Choose a graph to load
            </option>
            {this.buildLoadOptions()}
          </select>
          <input
            type="button"
            id="graph-load-button"
            value="Load"
            onClick={(e) => {
              this.handleLoadButtonClicked(e);
            }}
          />
        </div>
      </>
    );
  }
}

export { GraphCommunicationButtons as default };
