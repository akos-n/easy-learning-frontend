import React from "react";
import PropTypes from "prop-types";

import "./Content.scss";

class Content extends React.Component {
  render() {
    return React.createElement(
      "main",
      { className: this.props.className },
      this.props.children
    );
  }
}

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
};

Content.defaultProps = {
  className: "",
};

export { Content as default };
