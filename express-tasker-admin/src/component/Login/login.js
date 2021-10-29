import React from "react";

import Form from "../common/form";
import FooterSmall from "../Footer/Footer";

import Joi from "joi-browser";
import auth from "../../services/auth";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    active: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
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
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + require("./tools.png").default + ")",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="btn-wrapper text-center"></div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>

                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={this.handleSubmit}>
                      {this.renderInput("email", "Email")}
                      {this.renderInput("password", "Password", "password")}

                      {this.renderButton("Login")}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    );
  }
}

export default Login;
