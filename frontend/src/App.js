import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Basket from "./components/basket.component";
import Login from "./components/login.component";
import ProductsList from "./components/products-list.component";
import AddMaterial from "./components/add-material.component";

class App extends Component {
  render() {
    return (
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
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/addMaterial" className="nav-link">
                    Add Material
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={ProductsList} />
          <Route path="/basket" component={Basket} />
          <Route path="/login" component={Login} />
          <Route path="/addMaterial" component={AddMaterial} />
        </div>
      </Router>
    );
  }
}

export default App;