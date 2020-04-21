import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./Footer.scss";

class Footer extends React.Component {
  render() {
    return React.createElement(
      "footer",
      { className: clsx(this.props.className, "footer") },
      <>
        <h1>Created by: Akos Nagy</h1>
        <p>Email: akos.nagy95@gmail.com</p>
      </>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: "",
};

export { Footer as default };
