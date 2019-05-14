import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilis/setAuthToken";
import { setCurrentUser, logoutUser } from "../src/actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Basket from "./components/basket.component";
import Auth from "./components/auth.component";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductsList from "./components/products-list.component";
import AddMaterial from "./components/add-material.component";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Summary from "./components/summary.component";
import OrdersList from "./components/allOrders.component";
import Order from "./components/order.component";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  <li className="navbar-item">
                    <Link to="/auth" className="nav-link">
                      Auth
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/addMaterial" className="nav-link">
                      Add Material
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/allOrders" className="nav-link">
                      Wszystkie Zamówienia
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Route exact path="/" component={ProductsList} />
            <Route path="/basket" component={Basket} />
            <Route path="/auth" component={Auth} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/addMaterial" component={AddMaterial} />
            <Route path="/summary" component={Summary} />
            <Route path="/allOrders" component={OrdersList} />
            <Route path="/order" component={Order} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
