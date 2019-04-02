const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Material = new Schema({
  code: {
    type: String
  },
  category: {
    type: String
  },
  unitPrice: {
    type: Number
  },
  isAvalible: {
    type: Boolean
  },
  height: {
    type: Number
  },
  view: {
    type: String
  }
});

module.exports = mongoose.model("Material", Material);
