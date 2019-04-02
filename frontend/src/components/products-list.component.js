import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import materialHolder from "./materialimg.jpg";

// const Product = props => (
//   <div>
//     <h1>element</h1>
//     <p>{props.product.material_code}</p>
//   </div>
// );

const Product = props => (
  <div class="col-xs-10">
    <div class="card mw-25">
      <img className="card-img-top" src={materialHolder} alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{props.product.material_code}</h5>
        <h6 class="card-title">Cena: {props.product.material_unitPrice} zł</h6>
        <a href="#" class="btn btn-primary">
          Dodaj do koszyka
        </a>
      </div>
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/getMaterials")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  productsList() {
    return this.state.products.map(function(currentProduct, i) {
      return <Product product={currentProduct} key={i} />;
    });
  }

  render() {
    return (
      // <div style={{ marginTop: 20 }}>
      //   <h3>Products list</h3>
      //   <h4>[sortowanie]</h4>

      // </div>
      <div>
        <h3>Products list</h3>
        <h4>[sortowanie]</h4>

        <div class="card-deck w-100">{this.productsList()}</div>
      </div>
    );
  }
}
