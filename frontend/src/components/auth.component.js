import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";

// const responseGoogle = response => {
//   console.log(response);
//   console.log(response);
// };

export default class Auth extends Component {
  render() {
    return (
      // <div style={{ marginTop: 20 }}>
      //   {/* <GoogleAPI
      //     clientId="363035258556-m8naekolmp41h1097cj7gdar2u2kdnn8.apps.googleusercontent.com"
      //     onUpdateSigninStatus={console.log("onUpdateSigninStatus")}
      //     onInitFailure={console.log("onInitFailure")}
      //     // onUpdateSigninStatus={responseGoogle}
      //     // onInitFailure={responseGoogle}
      //   >
      //     <GoogleLogin />
      //   </GoogleAPI> */}
      //   <h1>Heloo</h1>
      // </div>

      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <Link to="/register" className="btn btn-outline-primary">
          Register
        </Link>
        <Link to="/login" className="btn btn-outline-primary">
          Login
        </Link>
        <div className="row">
          <div className="col s12 center-align">
            <a
              href="/"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </a>
            <a
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    );
  }
}
