import React, { Component } from "react";
import routes from "./routes";
import auth from "./services/auth";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./component/Login/login";

import Sidebar from "./component/Sidebar/sidebar";
import Dashboard from "./component/Dashboard/Dashboard";

import LogOut from "./component/LogOut/logout";
import VerificationRequest from "./component/VerficationRequests/verificationRequest";
import CustomerComplaints from "./component/CustomerComplaint/customerComplaint";
import AddAdmin from "./component/AddAdmin/addAdmin";
import ServiceProviderComplaints from "./component/ServiceProviderComplaints/serviceProviderComplaints";
import Admins from "./component/Admins/admins";

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
          <>
            <Sidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
              <Switch>
                <Route path="/logout" component={LogOut} />
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route
                  path="/admin/verificationrequests"
                  exact
                  component={VerificationRequest}
                />
                <Route path="/admin/addadmin" exact component={AddAdmin} />
                <Route
                  path="/admin/customercomplaints"
                  exact
                  component={CustomerComplaints}
                />
                <Route
                  path="/admin/serviceprovidercomplaints"
                  exact
                  component={ServiceProviderComplaints}
                />
                <Route path="/admin/admins" exact component={Admins} />
                <Redirect from="/" to="/admin/dashboard" />
              </Switch>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
