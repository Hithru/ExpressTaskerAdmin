import React from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function Dashboard() {
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
                  statTitle="3500"
                  statArrow="up"
                  statPercent="348"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Pending Complaints"
                  statIconName="fas fa-exclamation-circle"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="VERIFICATION REQUESTS"
                  statTitle="2,356"
                  statArrow="up"
                  statPercent="348"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Pending Requests"
                  statIconName="fas fa-certificate"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ORDERS"
                  statTitle="924"
                  statArrow="up"
                  statPercent="800"
                  statPercentColor="text-orange-500"
                  statDescripiron="Completed Orders"
                  statIconName="fas fa-chart-bar"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SERVICE PROVIDERS"
                  statTitle="4,965"
                  statArrow="up"
                  statPercent="3000"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Verified Users"
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
