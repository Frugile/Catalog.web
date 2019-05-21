const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
  data.nipCode = !isEmpty(data.nipCode) ? data.nipCode : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be at least 4 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

    // companyName checks
    if (Validator.isEmpty(data.companyName)) {
      errors.companyName = "Company Name field is required";
    }

    // address checks
    if (Validator.isEmpty(data.address)) {
      errors.address = "Address field is required";
    }

    // city checks
    if (Validator.isEmpty(data.city)) {
      errors.city = "City field is required";
    }

    // zipCode checks
    if (Validator.isEmpty(data.zipCode)) {
      errors.zipCode = "ZIP Code field is required";
    }

    // nipCode checks
    if (Validator.isEmpty(data.nipCode)) {
      errors.nipCode = "NIP Code field is required";
    }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
