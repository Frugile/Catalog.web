import React, { Component } from "react";
import axios from "axios";

export default class AddMaterial extends Component {
  constructor(props) {
    super(props);

    this.onChangeMaterialCode = this.onChangeMaterialCode.bind(this);
    this.onChangeMaterialCategory = this.onChangeMaterialCategory.bind(this);
    this.onChangeMaterialUnitPrice = this.onChangeMaterialUnitPrice.bind(this);
    this.onChangeMaterialIsAvaible = this.onChangeMaterialIsAvaible.bind(this);
    this.onChangeMaterialHeight = this.onChangeMaterialHeight.bind(this);
    this.onChangeMaterialView = this.onChangeMaterialView.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      material_code: "",
      material_category: "",
      material_unitPrice: "",
      material_isAvalible: false,
      material_height: "",
      material_view: ""
    };
  }

  onChangeMaterialCode(e) {
    this.setState({
      material_code: e.target.value
    });
  }

  onChangeMaterialCategory(e) {
    this.setState({
      material_category: e.target.value
    });
  }

  onChangeMaterialUnitPrice(e) {
    this.setState({
      material_unitPrice: e.target.value
    });
  }

  onChangeMaterialIsAvaible(e) {
    this.setState({
      material_isAvalible: e.target.value
    });
  }

  onChangeMaterialHeight(e) {
    this.setState({
      material_height: e.target.value
    });
  }

  onChangeMaterialView(e) {
    this.setState({
      material_view: e.target.value
    });
  }

  onFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.setState({
        material_view: reader.result
      });

      console.log(this.state);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  onSubmit(e) {
    e.preventDefault();

    const newMaterial = {
      material_code: this.state.material_code,
      material_category: this.state.material_category,
      material_unitPrice: this.state.material_unitPrice,
      material_isAvalible: this.state.material_isAvalible,
      material_height: this.state.material_height,
      material_view: this.state.material_view
    };
    axios
      .post("http://localhost:4000/todos/addMaterial", newMaterial)
      .catch(function(error) {
        console.log(error);
        alert(error);
      });

    this.setState({
      material_code: "",
      material_category: "",
      material_unitPrice: "",
      material_isAvalible: false,
      material_height: "",
      material_view: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Add New Material</h3>
        <form onSubmit={this.onSubmit}>
          <div className="from-group">
            <label>Code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.material_code}
              onChange={this.onChangeMaterialCode}
            />
          </div>
          <div className="from-group">
            <label>Category: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.material_category}
              onChange={this.onChangeMaterialCategory}
            />
          </div>
          <div className="from-group">
            <label>Unit Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.material_unitPrice}
              onChange={this.onChangeMaterialUnitPrice}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isAvalibleCheckbox"
              name="isAvalibleCheckbox"
              onChange={this.onChangeMaterialIsAvaible}
              checked={this.state.material_isAvalible}
              value={this.state.material_isAvalible}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              IsAvalible
            </label>
          </div>
          <div className="from-group">
            <label>Height: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.material_height}
              onChange={this.onChangeMaterialHeight}
            />
          </div>
          <div className="from-group">
            <label>View Code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.material_view}
              onChange={this.onChangeMaterialView}
            />
          </div>
          <div className="form-group">
            <label>Obraz:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control-file"
              onChange={this.onFileChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Material"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}