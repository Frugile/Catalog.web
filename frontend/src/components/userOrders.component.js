import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

const Order = props => (
  <tr>
    <td>
      <Link to={"/order"} params={props.order.id}>
        {props.order.date}
      </Link>
    </td>
    <td>{props.order.email}</td>
    <td>{props.order.basket.totalPrice}</td>
  </tr>
);

class UserOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/todos/getUserOrders", {
        params: {
          id: this.props.auth.user.id
        },
        withCredentials: true
      })
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
                <th>Email</th>
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

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(UserOrders);