import React from "react";
import { v4 } from "uuid";

import "./BasePopup.scss";

class UsersGuidePopup extends React.Component {
  componentDidMount() {
    let collapsibleElements = document.getElementsByClassName(
      "collapsible-button"
    );
    for (let i = 0; i < collapsibleElements.length; i++) {
      collapsibleElements[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  getNewCollapsible(collapsibleHeader, collapsibleContent) {
    return (
      <>
        <input
          type={"button"}
          key={v4()}
          className={"collapsible-button"}
          value={collapsibleHeader}
        />
        <div className={"collapsible-content"}>
          <p>{collapsibleContent}</p>
        </div>
      </>
    );
  }

  renderUsersGuide() {
    let colls = [];

    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "SET GRAPH'S DIRECTIVITY",
          "Click on the switch on the top of the run algorithm dialog. (The dialog is below or on the right side of the drawing board.)"
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "ADD NEW VERTEX",
          "Click on the drawing board in the position where you want to place the new vertex."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible("SELECT VERTEX", "Click on the placed vertex.")
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "DELETE VERTEX",
          "Select the vertex which you want to delete then click on the Delete button (what shows up after selection on the left-topside) OR push Del button on your keyboard. If you push the Del button without selection then the last placed vertex will be deleted."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "ADD NEW EDGE",
          "First select the starting vertex then click on another (the ending) vertex."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "SELECT EDGE",
          "Click on the edge's weight OR on the edge nearly to it's weight."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "CHANGE EDGE'S WEIGHT",
          "Select the edge whose weight you want to change then shows up an input box on the bottom of the drawing board."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "DELETE EDGE",
          "Select the edge which you want to delete then click on the Delete button (what shows up after selection on the left-topside) OR push Del button on your keyboard."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "LOAD GRAPH",
          "Choose a graph to load with the selection (on the left side of the Load button) then click on the Load button."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "SAVE GRAPH",
          "Create a graph what you want to save then write the graph's name in the text box (on the left of the Save button) then click on the Save button."
        )
      )
    );
    colls.push(
      React.createElement(
        "div",
        { key: v4() },
        this.getNewCollapsible(
          "RUN ALGORITHM",
          "You find the run algorithm dialog below or on the right side of the drawing board. First you have to choose the algorithm which you want to run on the graph and a starting vertex if the algorithm needs it. Second if you chose the algorithm then click the Run button on the bottom of the dialog."
        )
      )
    );
    return colls;
  }

  render() {
    return (
      <div className={"popup"}>
        <div className={"popup-inner"}>
          <div className={"popup-inner-header"}>
            <h1>User's Guide</h1>
            <input
              type={"button"}
              value={"X"}
              onClick={this.props.closePopup}
            />
          </div>
          <div className={"popup-inner-body"}>{this.renderUsersGuide()}</div>
        </div>
      </div>
    );
  }
}

export { UsersGuidePopup as default };
