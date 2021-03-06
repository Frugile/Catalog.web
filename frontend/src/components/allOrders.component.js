import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function formatDate(date) {
  date = new Date(date);
  var day = date.getDate();
  day = day > 9 ? day : "0" + day;
  var month = date.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

const Order = props => (
  <tr>
    <td>
      <Link
        to={{
          pathname: "/orderWholesale",
          state: {
            id: props.order._id
          }
        }}
      >
        {!props.order.isCompleted ? (
          formatDate(props.order.date)
        ) : (
          <p>
            <s>{formatDate(props.order.date)}</s>
          </p>
        )}
      </Link>
    </td>
    <td>{props.order.basket.totalPrice}</td>
  </tr>
);

export default class OrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/todos/getOrders")
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  ordersList() {
    return this.state.orders.map(function(currentOrder, i) {
      return <Order order={currentOrder} key={i} />;
    }, this);
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Podsumowanie</h3>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Data</th>
                <th>Wartość zamówienia</th>
              </tr>
            </thead>
            <tbody>{this.ordersList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
