import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import materialHolder from "./materialimg.jpg";
import axios from "axios";

const Product = props => (
  <div class="col-6 col-cs-12 col-xl-3 h-100 mb-3">
    <div className="card">
      {/* <div class="card mw-20"> */}
      <img
        className="card-img-top mw-100"
        src={props.product.material_view}
        alt="Card image cap"
      />
      {/* <img className="card-img-top" src={materialHolder} alt="Card image cap" /> */}
      <div class="card-body">
        <h5 className="card-title">{props.product.material_code}</h5>
        <h6 className="card-title">
          Cena: {props.product.material_unitPrice} zł
        </h6>
        <a href="#" className="btn btn-outline-primary btn-sm">
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

  sortPrice(value) {
    const { products } = this.state;
    let newProducts = products;

    if (value == 1) {
      this.setState({
        products: newProducts.sort(
          (a, b) => a.material_unitPrice > b.material_unitPrice
        )
      });
    } else {
      this.setState({
        products: newProducts.sort(
          (a, b) => a.material_unitPrice < b.material_unitPrice
        )
      });
    }
  }

  filterPrice(minPrice, maxPrice) {
    console.log("filtrowanie");
    console.log(minPrice);
    console.log(maxPrice);
    axios
      .get("http://localhost:4000/todos/getMaterials/filterPrice", {
        params: {
          valMin: minPrice,
          valMax: maxPrice
        }
      })
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    return;
  }

  selectCategory(category) {
    axios
      .get("http://localhost:4000/todos/getMaterials/selectCategory", {
        params: {
          val: category
        }
      })
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    return;
  }

  render() {
    return (
      <div className="container">
        <h3>Products list</h3>
        <div className="row">
          <div className="col-2">
            <div class="btn-group-vertical">
              <button
                type="radio"
                name="a"
                class="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.componentDidMount()}
              >
                Wszystkie kategorie
              </button>
              <button
                type="radio"
                name="a"
                class="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.selectCategory("S1")}
              >
                Kategoria S1
              </button>
              <button
                type="radio"
                name="a"
                class="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.selectCategory("S2")}
              >
                Kategoria S2
              </button>
              <button
                type="radio"
                name="a"
                class="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.selectCategory("S3")}
              >
                Kategoria S3
              </button>
            </div>

            <div>
              <div className="input-group" style={{ marginTop: 10 }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Cena
                  </span>
                </div>
                <input type="text" class="form-control" id="minimalPrice" />
                <input type="text" class="form-control" id="maximalPrice" />
              </div>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ marginTop: 10, marginBottom: 10 }}
                onClick={() => {
                  console.log("guzik");
                  console.log(document.getElementById("minimalPrice").value);
                  console.log(document.getElementById("maximalPrice").value);
                  this.filterPrice(
                    document.getElementById("minimalPrice").value,
                    document.getElementById("maximalPrice").value
                  );
                }}
              >
                Filtruj
              </button>
            </div>

            <div class="form-group">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  name="radios"
                  type="radio"
                  id="radios1"
                  onClick={() => this.sortPrice(1)}
                />
                <label class="form-check-label" for="radios1">
                  Cena: rosnąco
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  name="radios"
                  type="radio"
                  id="radios2"
                  onClick={() => this.sortPrice(-1)}
                />
                <label class="form-check-label" for="radios2">
                  Cena: malejąco
                </label>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div class="card-deck">{this.productsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}
