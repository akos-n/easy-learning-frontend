import React from "react";
import browserHistory from "../../_services/HistoryService";
import AuthService from "../../_services/AuthService";

import "./LoginContent.scss";

class LoginContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  checkPreConditions() {
    let emptyFieldNames = [];
    if (this.state.username === "") {
      emptyFieldNames.push("username");
    }
    if (this.state.password === "") {
      emptyFieldNames.push("password");
    }

    let alertString = "";
    if (emptyFieldNames.length > 0) {
      alertString =
        "The " +
        emptyFieldNames.join(", ") +
        (emptyFieldNames.length === 1 ? " field is" : " fields are") +
        " empty!";
    }

    if (alertString !== "") {
      alert(alertString);
      return false;
    }
    return true;
  }

  async handleOnSubmit(e) {
    if (!this.checkPreConditions()) return;

    const response = await AuthService.login(
      this.state.username,
      this.state.password
    );
    if (response.success && response.needNewPassword)
      browserHistory.push("/update-password");
    else if (response.success) browserHistory.push("/");
  }

  render() {
    return (
      <>
        <div className="login-form">
          <div className="container">
            <h1>Login</h1>
            <hr></hr>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={(e) => this.handleUsernameChange(e)}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => this.handlePasswordChange(e)}
            />
            <hr></hr>

            <input
              type="button"
              value="Sign in"
              onClick={(e) => this.handleOnSubmit(e)}
            />
          </div>
          <div className="container-forgotten-datas">
            <p>
              Have you forgotten your username or password? <br />
              <a href="/forgotten-datas">Click here</a>.
            </p>
          </div>
          <div className="container-signup">
            <p>
              Create an account: <a href="/register">Sign up</a>.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export { LoginContent as default };
