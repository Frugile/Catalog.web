import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    console.log("xddd");
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      companyName: "",
      address: "",
      city: "",
      zipCode: "",
      nipCode: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      companyName: this.state.companyName,
      address: this.state.address,
      city: this.state.city,
      zipCode: this.state.zipCode,
      nipCode: this.state.nipCode
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Zarejestruj się</b> ponieżej
              </h4>
              <p className="grey-text text-darken-1">
                Już masz konto? <Link to="/login">Zaloguj się</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col-lg-4 col-sm-8">
                <label htmlFor="name">Imię i nazwisko</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.name}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="email">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="form-control"
                />

                <span className="text-danger">{errors.email}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="password">Hasło</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="form-control"
                />

                <span className="text-danger">{errors.password}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="password2">Potwierdź hasło</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className="form-control"
                />

                <span className="text-danger">{errors.password2}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="companyName">Nazwa firmy</label>
                <input
                  onChange={this.onChange}
                  value={this.state.companyName}
                  error={errors.companyName}
                  id="companyName"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.companyName}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="address">Adres</label>
                <input
                  onChange={this.onChange}
                  value={this.state.address}
                  error={errors.address}
                  id="address"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.address}</span>
              </div>
              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="city">Miasto</label>
                <input
                  onChange={this.onChange}
                  value={this.state.city}
                  error={errors.city}
                  id="city"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.city}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="zipCode">Kod pocztowy</label>
                <input
                  onChange={this.onChange}
                  value={this.state.zipCode}
                  error={errors.zipCode}
                  id="zipCode"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.zipCode}</span>
              </div>

              <div className="input-field  col-lg-4 col-sm-8">
                <label htmlFor="nipCode">Kod NIP</label>
                <input
                  onChange={this.onChange}
                  value={this.state.nipCode}
                  error={errors.nipCode}
                  id="nipCode"
                  type="text"
                  className="form-control"
                />

                <span className="text-danger">{errors.nipCode}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Zarejestruj się
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// export default Register;

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
