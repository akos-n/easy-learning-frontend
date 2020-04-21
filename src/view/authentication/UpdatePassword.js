import React from "react";
import browserHistory from "../../_services/HistoryService";
import AuthService from "../../_services/AuthService";

import "./UpdatePassword.scss";

class RegisterContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    };
  }

  handleOldPasswordChange(e) {
    this.setState({ oldPassword: e.target.value });
  }

  handleNewPasswordChange(e) {
    this.setState({ newPassword: e.target.value });
  }

  handleNewPasswordRepeatChange(e) {
    this.setState({ newPasswordRepeat: e.target.value });
  }

  async handleOnSubmit() {
    if (this.state.newPassword !== this.state.newPasswordRepeat) return;

    if (
      await AuthService.updatePassword(
        this.state.oldPassword,
        this.state.newPassword
      )
    )
      browserHistory.push("/");
  }

  render() {
    return (
      <>
        <div className="update-password-form">
          <div className="container">
            <h1>Update password</h1>
            <hr></hr>

            <label htmlFor="psw">
              <b>Old or Temporary Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Old or Temporary Password"
              name="psw"
              required
              onChange={(e) => this.handleOldPasswordChange(e)}
            />

            <label htmlFor="psw">
              <b>New Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              name="psw"
              required
              onChange={(e) => this.handleNewPasswordChange(e)}
            />

            <label htmlFor="psw-repeat">
              <b>Repeat New Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat New Password"
              name="psw-repeat"
              required
              onChange={(e) => this.handleNewPasswordRepeatChange(e)}
            />
            <hr></hr>

            <input
              type="button"
              value="Update Password"
              onClick={(e) => this.handleOnSubmit(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

export { RegisterContent as default };
