import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProductsList from "./components/products-list.component";
import AddMaterial from "./components/add-material.component";

it("renders App without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders ProductsList without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ProductsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders AddMaterial without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddMaterial />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Examining the syntax of Jest tests", () => {
  it("sums numbers", () => {
    expect(1 + 2).toEqual(3);
    expect(2 + 2).toEqual(4);
  });
});
