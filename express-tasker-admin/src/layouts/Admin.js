import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Sidebar from "../component/Sidebar/sidebar";
import Dashboard from "../component/Dashboard/Dashboard";

import LogOut from "../component/LogOut/logout";
import VerificationRequest from "../component/VerficationRequests/verificationRequest";
import CustomerComplaints from "../component/CustomerComplaint/customerComplaint";

export default function Admin() {
  return (
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
          <Route
            path="/admin/customercomplaints"
            exact
            component={CustomerComplaints}
          />
          {/* <Route path="/admin/maps" exact component={Maps} />
                  <Route path="/admin/settings" exact component={Settings} />
                  <Route path="/admin/tables" exact component={Tables} /> */}
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
        {/* <FooterAdmin /> */}
      </div>
    </>
  );
}
