import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginContent from "../authentication/LoginContent";
import ForgottenDatasContent from "../authentication/ForgottenDatasContent";
import UpdatePassword from "../authentication/UpdatePassword";
import RegisterContent from "../authentication/RegisterContent";
import GraphContent from "../graph_algorithms/GraphContent";

class Page extends React.Component {
  render() {
    return (
      <>
        <Header className="header" />
        <Content className="main">
          <Router>
            <Route path="/" exact>
              <GraphContent />
            </Route>
            <Route path="/login" exact>
              <LoginContent />
            </Route>
            <Route path="/forgotten-datas" exact>
              <ForgottenDatasContent />
            </Route>
            <Route path="/update-password" exact>
              <UpdatePassword />
            </Route>
            <Route path="/register" exact>
              <RegisterContent />
            </Route>
          </Router>
        </Content>
        <Footer className="footer" />
      </>
    );
  }
}

export { Page as default };
