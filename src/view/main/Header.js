import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import history from "../../_services/HistoryService";
import authService from "../../_services/AuthService";

import "./Header.scss";

class Header extends React.Component {
  handleRegisterOnClick() {
    history.push("/register");
  }

  handleLoginOnClick() {
    history.push("/login");
  }

  handleLogoOnClick() {
    history.push("/");
  }

  handleLogoutOnClick() {
    authService.logout();
    this.setState({});
  }

  renderAuthButtons() {
    const currentUser = authService.getCurrentUser();
    if (currentUser !== null) {
      return (
        <div className="header-auth-buttons">
          <label>Hi, {currentUser.username}!</label>
          <input
            type="button"
            id="header-logout-button"
            value="Sign out"
            onClick={() => {
              this.handleLogoutOnClick();
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="header-auth-buttons">
          <input
            type="button"
            id="header-login-button"
            value="Sign in"
            onClick={() => {
              this.handleLoginOnClick();
            }}
          />
          <input
            type="button"
            id="header-register-button"
            value="Sign up"
            onClick={() => {
              this.handleRegisterOnClick();
            }}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <header className={clsx(this.props.className, "header-root")}>
        <h1
          onClick={(e) => {
            this.handleLogoOnClick();
          }}
        >
          easy learning
        </h1>
        {this.renderAuthButtons()}
      </header>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: "",
};

export { Header as default };
