import React from "react";
import PropTypes from "prop-types";

import "./PopUp.scss";

export default class PopUp extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClickOutside();
    }
  }

  render() {
    return (
      <div className={"popup"}>
        <div className={"popup-inner"} ref={this.wrapperRef}>
          <div className={"popup-inner-header"}>
            {this.props.headerChildren}
          </div>
          <div className={"popup-inner-body"}>{this.props.bodyChildren}</div>
        </div>
      </div>
    );
  }
}

PopUp.propTypes = {
  headerChildren: PropTypes.element.isRequired,
  bodyChildren: PropTypes.element.isRequired,
};
