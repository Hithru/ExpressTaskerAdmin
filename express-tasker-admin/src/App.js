import React, { Component } from "react";
import routes from "./routes";
import auth from "./services/auth";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./component/Login/login";
import Sidebar from "./component/Sidebar/sidebar";
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
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        )}
        {user && (
          <div>
            <Sidebar />
          </div>
        )}
      </div>
    );
  }
}

export default App;
