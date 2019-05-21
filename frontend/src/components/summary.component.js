import React, { Component } from "react";
import { connect } from "react-redux"
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

class Summary extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
        products: [],
        totalQty: 0,
        totalPrice: 0,
        cart: JSON,

        companyName: "",
        address: "",
        city: "",
        zipCode: "",
        nipCode: ""
    };
  }

  onSubmit(e) {
      e.preventDefault();

      const newSummary = {
        user: this.props.auth.user.id,
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

    await axios
      .get("http://localhost:4000/todos/getUser", {
        params: {
          id: this.props.auth.user.id,
          details: "companyName address city zipCode nipCode"
        },
        withCredentials: true
      })
      .then(response => {
        var user = response.data;

        console.log(user)

        this.setState({
          companyName: user.companyName,
          address: user.address,
          city: user.city,
          zipCode: user.zipCode,
          nipCode: user.nipCode
        });
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
                <form onSubmit="submit">
                    <div className="form-group">
                        <label>Nazwa:</label>
                        <input
                            className="form-control"
                            value={this.state.companyName}
                            disabled="disabled" />
                    </div>
                    <div className="form-group">
                        <label>Adres:</label>
                        <input
                            className="form-control"
                            value={this.state.address}
                            disabled="disabled" />
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label>Miejscowość:</label>
                        <input
                            className="form-control"
                            value={this.state.city}
                            disabled="disabled" />
                      </div>
                      <div className="form-group col-sm-6">
                        <label>Kod pocztowy:</label>
                        <input
                            className="form-control"
                            value={this.state.zipCode}
                            disabled="disabled" />
                      </div>
                    </div>
                    <div className="form-group">
                        <label>Nip:</label>
                        <input
                            className="form-control"
                            value={this.state.nipCode}
                            disabled="disabled" />
                    </div>
                    <div className="form-group" style={{ marginTop: 30 }}>
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

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Summary);