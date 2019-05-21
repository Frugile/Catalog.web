import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      userName: ""
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    // this.forceUpdate();
  };

  render() {
    // var { user } = this.props.auth;
    // console.log(this.props.auth);
    // if (user) {
    //   user = { name: "Anonim" };
    // }
    if (this.props.auth) {
      this.state = {
        logged: this.props.auth.isAuthenticated,
        userName: this.props.auth.user.name
      };
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link to="/" className="navbar-brand">
          <h2>Catalog.web</h2>
        </Link>
        <div className="navbar-expand">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/basket" className="nav-link">
                Koszyk
              </Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/auth" className="nav-link">
                Auth
              </Link>
            </li> */}
            <li className="navbar-item">
              <Link to="/dashboard" className="nav-link">
                Dash
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/addMaterial" className="nav-link">
                Add Material
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/allOrders" className="nav-link">
                Zamówienia
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/userOrders" className="nav-link">
                Moje Zamówienia
              </Link>
            </li>
            <li className="navbar-item nav-link">
              <strong>
                {this.state.userName === undefined
                  ? ""
                  : this.state.userName.split(" ")[0]}
              </strong>
            </li>
          </ul>
        </div>
        {this.state.userName === undefined ? (
          <Link to="/login" className="btn btn-outline-dark btn-sm">
            Zaloguj
          </Link>
        ) : (
          <button
            onClick={this.onLogoutClick}
            className="btn btn-outline-dark btn-sm"
          >
            Wyloguj
          </button>
        )}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
