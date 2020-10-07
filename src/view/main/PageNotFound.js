import React from "react";

import "./PageNotFoundContent.scss";

class PageNotFoundContent extends React.Component {
  render() {
    return (
      <>
        <div className="page-not-found">
          <div className="container">
            <h5>404</h5>
            <h6>Oops! Page not found</h6>
            <p>
              Sorry, but the page you are looking for is not found. Please, make
              sure you have typed the current URL.
            </p>
            <p>
              <a href="/">Return to the homepage</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export { PageNotFoundContent as default };
