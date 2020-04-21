import React from "react";
import browserHistory from "../../_services/HistoryService";
import AuthService from "../../_services/AuthService";

import "./RegisterContent.scss";

class RegisterContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordRepeatChange(e) {
    this.setState({ passwordRepeat: e.target.value });
  }

  async handleOnSubmit() {
    if (
      this.state.password !== this.state.passwordRepeat &&
      this.state.password !== ""
    )
      return;

    if (
      await AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      )
    )
      browserHistory.push("/login");
  }

  render() {
    return (
      <>
        <div className="register-form">
          <div className="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
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

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={(e) => this.handleEmailChange(e)}
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

            <label htmlFor="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              required
              onChange={(e) => this.handlePasswordRepeatChange(e)}
            />
            <hr></hr>

            <input
              type="button"
              value="Register"
              onClick={(e) => this.handleOnSubmit(e)}
            />
          </div>
          <div className="container signin">
            <p>
              Already have an account? <a href="/login">Sign in</a>.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export { RegisterContent as default };
