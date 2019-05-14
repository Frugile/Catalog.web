import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = props => (
  <tr>
    <td>{props.product.name}</td>
    <td className="d-flex justify-content-between">
      {props.product.qty}
      <div className="btn-group btn-group-sm" role="group">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            props.cartState.products[props.index].qty++;
            props.this.state.totalQty++;
            props.this.state.totalPrice += props.product.price;
            props.this.forceUpdate();
          }}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            props.cartState.products[props.index].qty--;
            if (props.cartState.products[props.index].qty === 0) {
              props.cartState.products.splice(props.index, 1);
            }
            props.this.state.totalQty--;
            props.this.state.totalPrice -= props.product.price;
            props.this.forceUpdate();
          }}
        >
          -
        </button>
      </div>
      <div> </div>
    </td>
    <td>{props.product.price * props.product.qty}</td>
  </tr>
);

export default class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], totalQty: 0, totalPrice: 0 };
  }

  async componentDidMount() {
    var cart;
    await axios
      .get("http://localhost:4000/todos/getMaterials/getCart", {
        withCredentials: true
      })
      .then(response => {
        cart = response.data;
        var arr = [];
        for (var id in cart.items) {
          arr.push(cart.items[id]);
        }
        this.setState({
          totalQty: cart.totalQty,
          totalPrice: cart.totalPrice,
          products: arr
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state);
  }
  async componentDidUpdate() {
    console.log("update!");
    console.log(this.state.products);
    const arrToObj = arr =>
      arr.reduce((obj, item) => {
        obj[item.item] = item;
        return obj;
      }, {});
    const cart = {
      items: arrToObj(this.state.products),
      totalPrice: this.state.totalPrice,
      totalQty: this.state.totalQty
    };

    await axios
      .get("http://localhost:4000/todos/getMaterials/updateCart", {
        params: {
          cart: cart
        },
        withCredentials: true
      })
      .then(response => {
        console.log("update res");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  productList() {
    return this.state.products.map(function(currentProduct, i) {
      return (
        <Product
          product={currentProduct}
          key={i}
          cartState={this.state}
          this={this}
          index={i}
        />
      );
    }, this);
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Koszyk</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Ilość</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {this.productList()}
            <tr className="table-secondary font-weight-bold">
              <td>Łącznie</td>
              <td>{this.state.totalQty}</td>
              <td>{this.state.totalPrice}</td>
            </tr>
          </tbody>
        </table>

        <Link to={"/summary"}>
          <button className="btn btn-primary">Podsumowanie</button>
        </Link>
      </div>
    );
  }
}
