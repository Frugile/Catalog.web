import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import ReactDOM from "react-dom";
import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";

const responseGoogle = response => {
  console.log(response);
};

export default class Login extends Component {
  render() {
    return (
      // <div style={{ marginTop: 20 }}>
      //   <Link to={"/"}>
      //     <button className="btn btn-primary">Zaloguj z Google</button>
      //   </Link>
      // </div>
      <div style={{ marginTop: 20 }}>
        <GoogleAPI clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleAPI>
      </div>

      //   <GoogleAPI
      //     clientId="YOUR CLIENT ID"
      //     onUpdateSigninStatus={CALLBACK}
      //     onInitFailure={CALLBACK}
      //   >
      //     <div>
      //       <div>
      //         <GoogleLogin />
      //       </div>
      //       <div>
      //         <GoogleLogout />
      //       </div>
      //     </div>
      //   </GoogleAPI>
      // ),
      // document.getElementById("root")
    );
  }
}
