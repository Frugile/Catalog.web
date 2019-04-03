import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import materialHolder from "./materialimg.jpg";
import axios from "axios";

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
        <div className="btn-group-vertical">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 5 }}
          >
            Category 1
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 5 }}
          >
            Category 2
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 5 }}
          >
            Category 3
          </button>
        </div>

        <div>
          <div className="input-group" style={{ marginTop: 10 }}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Price
              </span>
            </div>
            <input type="text" className="form-control" />
            <input type="text" className="form-control" />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 5 }}
          >
            Filtruj
          </button>
        </div>

        <div className="form-group-vertical">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" />
            <label>price: ascending</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" />
            <label>price: descending</label>
          </div>
        </div>


        <div class="card-deck w-100">{this.productsList()}</div>
      </div>
    );
  }
}
