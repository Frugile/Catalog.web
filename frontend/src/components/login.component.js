import React, { Component } from "react";
import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";

const responseGoogle = response => {
  console.log(response);
};

export default class Login extends Component {
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <GoogleAPI clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleAPI>
      </div>
    );
  }
}
