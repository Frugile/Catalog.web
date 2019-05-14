import React from "react";
import ReactDOM from "react-dom";

import AddMaterial from "./components/add-material.component";
import Basket from "./components/add-material.component";
import ProductsList from "./components/products-list.component";
import AllOrders from "./components/allOrders.component";
import Summary from "./components/summary.component";

describe("renders Components without crashing", () => {
  it("renders AddMaterial without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AddMaterial />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders Basket without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Basket />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders ProductsList without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProductsList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders allOrders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AllOrders />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders Summary without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Summary />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
