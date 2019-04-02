import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <Link to={"/"}>
          <button className="btn btn-primary">Zaloguj z Google</button>
        </Link>
      </div>
    );
  }
}
