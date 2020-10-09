import React from "react";
import browserHistory from "../../_services/HistoryService";
import AuthService from "../../_services/AuthService";

import "./ForgottenDatasContent.scss";

class ForgottenDatasContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  async handleOnSubmit(e) {
    if (this.state.email === "") {
      alert("The email field is empty!");
      return;
    }
    if (await AuthService.sendDatas(this.state.email)) {
      browserHistory.push("/login");
    }
  }

  render() {
    return (
      <>
        <div className="forgotten-datas-form">
          <div className="container">
            <h1>Send account information</h1>
            <p>
              You will get your username and a temporary password (that lasts
              for the next 10 minutes).
            </p>
            <hr></hr>

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
            <hr></hr>

            <input
              type="button"
              value="Send"
              onClick={(e) => this.handleOnSubmit(e)}
            />
          </div>

          <div className="container signup">
            <p>
              Create an account: <a href="/register">Sign up</a>.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export { ForgottenDatasContent as default };
