import React, { Component } from "react";
import ServiceProvider from "../../services/serviceProvider";
class VerificationRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
    };
  }

  async componentDidMount() {
    const requestsArray = await ServiceProvider.getRequests();
    const requests = requestsArray.data;
    this.setState({ requests });
  }

  async handleDecline(request_id) {
    const request = await ServiceProvider.declineRequest(request_id);
    window.location = "/admin/verificationrequests";
  }

  async handleAccept(request_id) {
    const request = await ServiceProvider.acceptRequest(request_id);
    window.location = "/admin/verificationrequests";
  }
  render() {
    const { requests } = this.state;

    return (
      <div className="flex flex-wrap mt-4">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Verification Requests
            </h6>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Attachments
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Actions
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                ></th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item) => (
                <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.serviceProviderName}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <pre>
                      {item.description}
                      <br />
                    </pre>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.isSolved && item.isaccepted && (
                      <div>
                        <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
                        accepted
                      </div>
                    )}

                    {item.isSolved && !item.isaccepted && (
                      <div>
                        <i className="fas fa-circle text-red-500 mr-2"></i>{" "}
                        declined
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
                    <a href={item.attachments}>
                      <button className="bg-lightBlue-900 text-white active:bg-blueGray-600 text-xs  px-0 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                        View
                      </button>
                    </a>
                  </td>
                  <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {!item.isSolved && (
                      <div>
                        <button
                          className="bg-emerald-500  text-white active:bg-emerald-200  text-xs  px-0 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          onClick={() => this.handleAccept(item._id)}
                        >
                          Accept
                        </button>

                        <button
                          className="bg-red-500 text-white active:bg-red-200 text-xs  px-0 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          onClick={() => this.handleDecline(item._id)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
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

export default VerificationRequest;
