import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./component/Login/login";

export default (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Login} />
  </Switch>
);
