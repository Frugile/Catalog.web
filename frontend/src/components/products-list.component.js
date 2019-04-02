import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// const Todo = props => (
//   <tr>
//     <td>{props.todo.todo_description}</td>
//     <td>{props.todo.todo_responsible}</td>
//     <td>{props.todo.todo_priority}</td>
//     <td>
//       <Link to={"/edit/" + props.todo._id}>Edit</Link>
//     </td>
//   </tr>
// );

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:4000/todos/")
  //     .then(response => {
  //       this.setState({ todos: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  // todoList() {
  //   return this.state.todos.map(function(currentTodo, i) {
  //     return <Todo todo={currentTodo} key={i} />;
  //   });
  // }

  render() {
    return (
      // <div style={{ marginTop: 20 }}>
      //   <h3>Products list</h3>
      //   <h4>[sortowanie]</h4>

      // </div>
      <div>
        <h3>Products list</h3>
        <h4>[sortowanie]</h4>
        <div class="card-deck w-100">
          {/* <div class="card mw-25">
            <img
              class="card-img-top"
              src="https://placeimg.com/240/240/nature"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div> */}
          <div class="col-xs-10">
            <div class="card mw-25">
              <img
                class="card-img-top"
                src="https://placeimg.com/240/240/nature"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Artykuł</h5>
                <h6 class="card-title">Cena: 0,01 zł</h6>
                <a href="#" class="btn btn-primary">
                  Dodaj do koszyka
                </a>
              </div>
            </div>
          </div>

          <div class="col-xs-10">
            <div class="card mw-25">
              <img
                class="card-img-top"
                src="https://placeimg.com/240/240/nature"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Artykuł</h5>
                <h6 class="card-title">Cena: 0,01 zł</h6>
                <a href="#" class="btn btn-primary">
                  Dodaj do koszyka
                </a>
              </div>
            </div>
          </div>
          <div class="col-xs-10">
            <div class="card mw-25">
              <img
                class="card-img-top"
                src="https://placeimg.com/240/240/nature"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Artykuł</h5>
                <h6 class="card-title">Cena: 0,01 zł</h6>
                <a href="#" class="btn btn-primary">
                  Dodaj do koszyka
                </a>
              </div>
            </div>
          </div>
          {/* <div class="card mw-25">
            <img
              class="card-img-top"
              src="https://placeimg.com/240/240/nature"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Artykuł</h5>
              <h6 class="card-title">Cena: 0,01 zł</h6>
              <a href="#" class="btn btn-primary">
                Dodaj do koszyka
              </a>
            </div>
          </div>

          <div class="card mw-25">
            <img
              class="card-img-top"
              src="https://placeimg.com/240/240/nature"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Artykuł</h5>
              <h6 class="card-title">Cena: 0,01 zł</h6>
              <a href="#" class="btn btn-primary">
                Dodaj do koszyka
              </a>
            </div>
          </div>

          <div class="card mw-25">
            <img
              class="card-img-top"
              src="https://placeimg.com/240/240/nature"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Artykuł</h5>
              <h6 class="card-title">Cena: 0,01 zł</h6>
              <a href="#" class="btn btn-primary">
                Dodaj do koszyka
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
