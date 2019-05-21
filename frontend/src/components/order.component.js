import React, { Component } from "react";

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default class Order extends Component {
  constructor(props) {
    super(props);

    
  }

  componentDidMount() {
    console.log(this.props.match.params)
  }

  render() {
    return (
      <h3>{Child}</h3>
    )
  }
}