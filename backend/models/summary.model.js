const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let summary = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
  },
  basket: {
    type: JSON
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Summary", summary);