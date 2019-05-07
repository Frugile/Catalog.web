import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
// import './App.css';

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Basket from "./components/basket.component";
import Login from "./components/login.component";
import ProductsList from "./components/products-list.component";
import AddMaterial from "./components/add-material.component";

// import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <h2>Catalog.web</h2>
            </Link>
            {/* <a className="navbar-brand" href="/">
              <h2>Catalog.web</h2>
            </a> */}
            {/* <Link to="/" className="navbar-brand">
              Catalog.web
            </Link> */}
            {/* <div className="collapse navbar-collapse"> */}
            <div className="navbar-expand">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todos/" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/todos/create" className="nav-link">
                    Create
                  </Link>
                </li>
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

          {/* <h2>Catalog.web</h2> */}
          <Route path="/" exact component={ProductsList} />
          <Route path="/todos/" exact component={TodosList} />
          <Route path="/todos/edit/:id" component={EditTodo} />
          <Route path="/todos/create" component={CreateTodo} />
          <Route path="/basket" component={Basket} />
          <Route path="/login" component={Login} />
          <Route path="/addMaterial" component={AddMaterial} />
        </div>
      </Router>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
