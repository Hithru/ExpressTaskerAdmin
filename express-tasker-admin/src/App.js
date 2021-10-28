import React, { Component } from "react";
import routes from "./routes";
import auth from "./services/auth";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    return <div className="App">{routes}</div>;
  }
}

export default App;
