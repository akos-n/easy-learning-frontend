import React from "react";
import browserHistory from "../../_services/HistoryService";
import AuthService from "../../_services/AuthService";

import PageNotFound from "../main/PageNotFound";

import "./UpdatePassword.scss";

class RegisterContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  checkPreConditions() {
    let emptyFieldNames = [];
    if (this.state.oldPassword === "") {
      emptyFieldNames.push("old or temporary password");
    }
    if (this.state.newPassword === "") {
      emptyFieldNames.push("new password");
    }
    if (this.state.newPasswordRepeat === "") {
      emptyFieldNames.push("repeat new password");
    }

    let alertString = "";
    if (emptyFieldNames.length > 0) {
      alertString =
        "The " +
        emptyFieldNames.join(", ") +
        (emptyFieldNames.length === 1 ? " field is" : " fields are") +
        " empty";
    }

    if (this.state.newPassword !== this.state.newPasswordRepeat) {
      alertString +=
        (alertString !== "" ? " and t" : "T") +
        "he given new passwords are different!";
    } else if (alertString !== "") {
      alertString += "!";
    }

    if (alertString !== "") {
      alert(alertString);
      return false;
    }
    return true;
  }

  async handleOnSubmit() {
    if (!this.checkPreConditions()) return;

    if (
      await AuthService.updatePassword(
        this.state.oldPassword,
        this.state.newPassword
      )
    ) {
      browserHistory.push("/");
    }
  }

  render() {
    if (AuthService.getCurrentUser() === null) {
      return <PageNotFound />;
    }
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
