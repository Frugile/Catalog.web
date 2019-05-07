let Material = require("../models/material_model");

module.exports = function Cart(oldCart) {
  // console.log("oldCart " + oldCart);
  // console.log(oldCart.items);
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.add = async function(id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      const material = await Material.findById(
        id,
        "material_code material_code material_unitPrice"
      );
      storedItem = this.items[id] = {
        item: id,
        name: material.material_code,
        qty: 0,
        price: material.material_unitPrice
      };
    }
    storedItem.qty++;
    this.totalQty++;
    this.totalPrice += storedItem.price;
  };

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
