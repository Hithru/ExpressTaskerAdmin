import React, { Component } from "react";
import routes from "./routes";
import auth from "./services/auth";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./component/Login/login";

import Admin from "./layouts/Admin";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <div className="App">
        {!user && (
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        )}
        {user && (
          <Switch>
            <Route path="/" component={Admin} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
