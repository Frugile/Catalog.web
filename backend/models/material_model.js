const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Material = new Schema({
  material_code: {
    type: String
  },
  material_category: {
    type: String
  },
  material_unitPrice: {
    type: Number
  },
  material_isAvalible: {
    type: Boolean
  },
  material_height: {
    type: Number
  },
  material_view: {
    type: String
  }
});

module.exports = mongoose.model("Material", Material);