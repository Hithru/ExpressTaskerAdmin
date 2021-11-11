import React, { Component } from "react";
import ServiceProvider from "../../services/serviceProvider";
import TableDropdown from "../Dropdown/TableDropdown.js";

class ServiceProviderComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complaints: [],
    };
  }

  async componentDidMount() {
    const complaintsArray = await ServiceProvider.getComplaints();
    const complaints = complaintsArray.data;
    this.setState({ complaints });
  }

  async handleResolved(complaint_id) {
    const complaint = await ServiceProvider.resolveComplaint(complaint_id);
    window.location = "/admin/serviceprovidercomplaints";
  }
  render() {
    const { complaints } = this.state;
    return (
      <div className="flex flex-wrap mt-4">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              ServiceProvider Complaints
            </h6>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse table-fixed ">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  ServiceProvider
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  EMAIL
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  DESCRIPTION
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  STATUS
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  ACTIONS
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item) => (
                <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.serviceProvider_name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.serviceProvider_email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <pre>
                      {item.description}
                      <br />
                    </pre>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.isSolved && (
                      <div>
                        <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
                        completed
                      </div>
                    )}
                    {!item.isSolved && (
                      <div>
                        <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                        pending
                      </div>
                    )}
                  </td>
                  <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {!item.isSolved && (
                      <div>
                        <button
                          className="bg-lightBlue-900 text-white active:bg-blueGray-600 text-sm  px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          onClick={() => this.handleResolved(item._id)}
                        >
                          Resolved
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown email={item.serviceProvider_email} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ServiceProviderComplaints;
