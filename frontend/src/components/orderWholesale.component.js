import axios from "axios";
import React, { Component } from "react";

const Product = props => (
  <tr>
    <td>{props.product.name}</td>
    <td className="d-flex justify-content-between">{props.product.qty}</td>
    <td>
        <div className="form-check">
            <input
              id={props.index}
              type="checkbox" 
              className="form-check-input"
              onChange={() => {
                if (document.getElementById(props.index).checked) {
                  props.this.state.counter++;
                } else {
                  props.this.state.counter--;
                }
                props.this.forceUpdate();
              }}
              >
            </input>
        </div>
    </td>
  </tr>
);

export default class OrderCustomer extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      counter: 0,
      products: [],
      basket: [],
      date: ""
    }
  }
 
  onSubmit(e) {
    if (navigator.onLine) {
      console.log("SSS")
      console.log(this)
      if (this.state.counter == this.state.products.length) {
        axios
        .get("http://localhost:4000/todos/updateOrder", {
          params: {
            id: this.props.location.state.id
          }
        })
        .then(response => {
          this.props.history.push("/allOrders");
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else {
        alert("Najperw przygotuj wszystkie produkty!")
      }
    }
    else {
      alert("Wymagane połączenie z siecią!")
    }
  }
  
  async componentDidMount() {
    await axios
      .get("http://localhost:4000/todos/getOrder", {
        params: {
          id: this.props.location.state.id,
          details: "basket date counter",
        }
      })
      .then(response => {
        var temp = [];
        for (var id in response.data.basket.items) {
          temp.push(response.data.basket.items[id]);
        }

        console.log(response.data)

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
      return <Product product={currentProduct} key={i} this={this} index={i}/>;
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
                  <th>Zmierzone</th>
                </tr>
              </thead>
              <tbody>
                {this.productList()}
                <tr className="table-secondary font-weight-bold">
                  <td>Łącznie</td>
                  <td>{this.state.basket.totalQty}</td>
                  <td>{this.state.counter}/{this.state.products.length}</td>
                </tr>
              </tbody> 
            </table>
            <button className="btn btn-primary" onClick={this.onSubmit}>Zapisz</button>
      </div>
    )
  }
}