import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store";

import Basket from "./components/basket.component";
import Auth from "./components/auth.component";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductsList from "./components/products-list.component";
import AddMaterial from "./components/add-material.component";

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
                </ul>
              </div>
            </nav>
            <Route exact path="/" component={ProductsList} />
            <Route path="/basket" component={Basket} />
            <Route path="/auth" component={Auth} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/addMaterial" component={AddMaterial} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
