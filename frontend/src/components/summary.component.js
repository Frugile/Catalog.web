import React, { Component } from "react";
import axios from "axios";

const Product = props => (
  <tr>
    <td>
        {props.product.name}
    </td>
    <td className="d-flex justify-content-between">
      {props.product.qty}
    </td>
    <td>
        {props.product.price * props.product.qty}
    </td>
  </tr>
);

export default class Summary extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserMail = this.onChangeUserMail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
        products: [],
        totalQty: 0,
        totalPrice: 0,
        user_name: "",
        user_mail: "" , 
        cart: JSON
    };
  }

  onChangeUserName(e) {
      this.setState({
        user_name: e.target.value
      });
  }

  onChangeUserMail(e) {
      this.setState({
          user_mail: e.target.value
      });
  }

  onSubmit(e) {
      e.preventDefault();

      const newSummary = {
        name: this.state.user_name,
        email: this.state.user_mail,
        basket: this.state.cart
      }

      axios
        .post("http://localhost:4000/todos/addSummary", newSummary)
        .catch(function(error) {
          console.log(error);
          alert(error);
        })
        .then(function() {
          window.open("http://localhost:3000");
        });
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/todos/getMaterials/getCart", {
        withCredentials: true
      })
      .then(response => {
        this.state.cart = response.data;
        var cart = this.state.cart
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

  productList() {
    return this.state.products.map(function(currentProduct, i) {
      return (
        <Product
          product={currentProduct}
          key={i}
        />
      );
    }, this);
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Podsumowanie</h3>
        <div className="row" style={{ marginTop: 20 }}> 
            <div className="col-6">
                <table className="table table-striped">
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
            </div>
            <div className="col-6">
                <form onSubmit={this.onSubmit}>
                    <div className="from-group">
                        <label>Nazwisko i imię: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.user_name}
                            onChange={this.onChangeUserName} />
                    </div>
                    <div className="from-group">
                        <label>E-mail: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.user_mail}
                            onChange={this.onChangeUserMail} />
                    </div>
                    <div className="form-group" style={{ marginTop: 20 }}>
                        <input
                            type="submit"
                            value="Potwierdź i zamów"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  }
}