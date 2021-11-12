import React from "react";

import Form from "../common/form";

import Joi from "joi-browser";
import auth from "../../services/auth";
import Admin from "../../services/Admin";

class AddAdmin extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
    active: false,
  };

  schema = {
    username: Joi.string().required().label("UserName"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await Admin.register(this.state.data);
      window.location = "/admin/admins";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold mb-4">
                Add New Admin
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Admin Information
              </h6>

              {this.renderInput("username", "UserName")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}

              {this.renderButton("Add Admin")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddAdmin;
