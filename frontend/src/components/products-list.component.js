import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const Product = props => (
  <div className="col-6 col-cs-12 col-xl-3 h-100 mb-3">
    <div className="card">
      <img
        className="card-img-top mw-100"
        src={props.product.material_view}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.product.material_code}</h5>
        <h6 className="card-title">
          Cena: {props.product.material_unitPrice} zł
        </h6>
        <button
          type="radio"
          name="a"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            axios
              .get("http://localhost:4000/todos/getMaterials/addToCart", {
                params: {
                  id: props.product._id
                },
                withCredentials: true
              })
              .then(response => {
                console.log(response.data);
              })
              .catch(function(error) {
                console.log(error);
              });
          }}
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: 1,
      category: ["S1", "S2", "S3"]
    };
  }

  componentDidMount() {
    console.log("componetDidMount");
    axios
      .get("http://localhost:4000/todos/getMaterials", {
        params: {
          details: "material_code material_unitPrice material_view",
          category: this.state.category,
          sort: this.state.sort
        },
        withCredentials: true
      })
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // async shouldComponentUpdate() {
  //   var should = true;
  //   await axios
  //     .get("http://localhost:4000/todos/getMaterials/selectCategory", {
  //       params: {
  //         details: "material_code material_unitPrice material_view",
  //         category: this.state.category,
  //         sort: this.state.sort
  //       }
  //     })
  //     .then(response => {
  //       if (this.state.products == response.data) {
  //         should = false;
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });s
  //   return should;
  // }

  componentDidUpdate() {
    console.log("componetDidUpdate");
    axios
      .get("http://localhost:4000/todos/getMaterials/selectCategory", {
        params: {
          details: "material_code material_unitPrice material_view",
          category: this.state.category,
          sort: this.state.sort
        },
        withCredentials: true
      })
      .then(response => {
        if (
          JSON.stringify(this.state.products) != JSON.stringify(response.data)
        ) {
          this.setState({ products: response.data });
          console.log("componetDidUpdate TRUE");
        }
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

  filterPrice(minPrice, maxPrice) {
    axios
      .get("http://localhost:4000/todos/getMaterials/filterPrice", {
        params: {
          valMin: minPrice,
          valMax: maxPrice
        },
        withCredentials: true
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
    console.log(this.state);
    axios
      .get("http://localhost:4000/todos/getMaterials/selectCategory", {
        params: {
          category: category,
          sort: this.state.sort
        },
        withCredentials: true
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
        <h3 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <b>Materiały</b>, które możesz kupić
        </h3>
        <div className="row">
          <div className="col-2">
            <div className="btn-group-vertical">
              <button
                type="radio"
                name="a"
                className="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.setState({ category: ["S1", "S2", "S3"] })}
              >
                Wszystkie kategorie
              </button>
              <button
                type="radio"
                name="a"
                className="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.setState({ category: ["S1"] })}
              >
                Kategoria S1
              </button>
              <button
                type="radio"
                name="a"
                className="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.setState({ category: ["S2"] })}
              >
                Kategoria S2
              </button>
              <button
                type="radio"
                name="a"
                className="btn btn-outline-secondary"
                style={{ marginTop: 5 }}
                onClick={() => this.setState({ category: ["S3"] })}
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
                <input type="text" className="form-control" id="minimalPrice" />
                <input type="text" className="form-control" id="maximalPrice" />
              </div>
              <button
                type="button"
                className="btn btn-outline-info"
                style={{ marginTop: 10, marginBottom: 10 }}
                onClick={() => {
                  this.filterPrice(
                    document.getElementById("minimalPrice").value,
                    document.getElementById("maximalPrice").value
                  );
                }}
              >
                Filtruj
              </button>
            </div>

            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  name="radios"
                  type="radio"
                  id="radios1"
                  onClick={() => {
                    this.setState({ sort: 1 });
                  }}
                />
                <label className="form-check-label" htmlFor="radios1">
                  Cena: rosnąco
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  name="radios"
                  type="radio"
                  id="radios2"
                  onClick={() => {
                    this.setState({ sort: -1 });
                  }}
                />
                <label className="form-check-label" htmlFor="radios2">
                  Cena: malejąco
                </label>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="card-deck">{this.productsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}
