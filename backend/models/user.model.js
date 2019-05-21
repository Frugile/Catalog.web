const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  companyName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  zipCode: {
    type: String,
    require: true
  },
  nipCode: {
    type: String,
    require: true
  },
  cart: {
    type: JSON
  }
});

module.exports = User = mongoose.model("users", UserSchema);
