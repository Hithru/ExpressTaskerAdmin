import React, { Component } from "react";
// components

import CardStats from "../Cards/CardStats.js";
import Dashboard from "../../services/Dashboard.js";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
    };
  }

  async componentDidMount() {
    const data_array = await Dashboard.getInfo();
    const info = data_array.data;

    this.setState({ info });
  }
  render() {
    const { info } = this.state;
    return (
      <>
        {/* Header */}
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="COMPLAINTS"
                    statTitle={info.num_complaints}
                    statArrow="up"
                    statPercent={info.num_pending_complaint}
                    statPercentColor="text-emerald-500"
                    statDescripiron="Pending Complaints"
                    statIconName="fas fa-exclamation-circle"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="VERIFICATION REQUESTS"
                    statTitle={info.num_verification}
                    statArrow="up"
                    statPercent={info.num_pending_verification}
                    statPercentColor="text-emerald-500"
                    statDescripiron="Pending Requests"
                    statIconName="fas fa-certificate"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="ORDERS"
                    statTitle={info.num_orders}
                    statArrow="up"
                    statPercent={info.num_complete_orders}
                    statPercentColor="text-emerald-500"
                    statDescripiron="Completed Orders"
                    statIconName="fas fa-chart-bar"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="SERVICE PROVIDERS"
                    statTitle={info.num_serviceProviders}
                    statArrow="up"
                    statPercent={info.num_verified_serviceProviders}
                    statPercentColor="text-emerald-500"
                    statDescripiron="Verified ServiceProviders"
                    statIconName="fas fa-users"
                    statIconColor="bg-lightBlue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashBoard;
