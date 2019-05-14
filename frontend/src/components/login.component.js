import React, { Component } from "react";
import { GoogleAPI, GoogleLogin } from "react-google-oauth";

const responseGoogle = response => {
  console.log(response);
};

export default class Login extends Component {
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <GoogleAPI
          clientId="363035258556-m8naekolmp41h1097cj7gdar2u2kdnn8.apps.googleusercontent.com"
          // onUpdateSigninStatus={console.log("onUpdateSigninStatus")}
          // onInitFailure={console.log("onInitFailure")}
          onUpdateSigninStatus={responseGoogle}
          onInitFailure={responseGoogle}
        >
          <GoogleLogin />
        </GoogleAPI>
      </div>
    );
  }
}
