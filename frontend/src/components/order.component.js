import axios from "axios";
import React, { Component } from "react";

const Product = props => (
  <tr>
    <td>{props.product.name}</td>
    <td className="d-flex justify-content-between">{props.product.qty}</td>
    <td>{props.product.price * props.product.qty}</td>
  </tr>
);

export default class Order extends Component {
  state = {
    products: [],
    basket: [],
    date: ""
  }
  
  async componentDidMount() {
    await axios
      .get("http://localhost:4000/todos/getOrder", {
        params: {
          id: this.props.location.state.data,
          details: "basket date",
        }
      })
      .then(response => {
        var temp = [];
        for (var id in response.data.basket.items) {
          temp.push(response.data.basket.items[id]);
        }

        this.setState({ 
          basket: response.data.basket,
          date: response.data.date,
          products: temp
        })
      })
      .catch(function(error) {
        console.log(error);
      });

      console.log(this.state.products)
  }

  productList() {
    return this.state.products.map(function(currentProduct, i) {
      return <Product product={currentProduct} key={i} />;
    }, this);
  }

  render() {
    return (
      <div>
        <label htmlFor="date" style={{marginTop:20}}>Data zamówienia:</label>
        <div id="date" style={{marginLeft:20}}>{this.state.date}</div>
        <label htmlFor="products" style={{marginTop:20}}>Szczegóły:</label>
        <table id="products" className="table table-striped">
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
                  <td>{this.state.basket.totalQty}</td>
                  <td>{this.state.basket.totalPrice}</td>
                </tr>
              </tbody>
            </table>
      </div>
    )
  }
}