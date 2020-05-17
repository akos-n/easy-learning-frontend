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
        <p>
          GitHub: <a href={"https://github.com/akos-n"}>akos-n</a>
        </p>
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
