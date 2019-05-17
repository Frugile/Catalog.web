let Material = require("../models/material_model");
var Cart = require("../models/cart.model");

let Summary = require("../models/summary.model")

const express = require("express");
const todoRoutes = express.Router();

todoRoutes.route("/getMaterials").get(function (req, res) {
  Material.find({}, req.query.details, function (err, materials) {
    if (err) {
      console.log(err);
    } else {
      res.json(materials);
    }
  }).sort({ material_code: 1 });
});


todoRoutes.route("/getOrders").get(function (req, res) {
  Summary.find(function (err, orders) {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  }).sort({ date: 1 });
})


todoRoutes.route("/getMaterials/filterPrice").get(function (req, res) {
  Material.find(
    { material_unitPrice: { $gte: req.query.valMin, $lt: req.query.valMax } },
    function (err, materials) {
      if (err) {
        console.log(err);
      } else {
        res.json(materials);
      }
    }
  ).sort({ material_code: 1 });
});

todoRoutes.route("/getMaterials/selectCategory").get(function (req, res) {
  Material.find({ material_category: { $in: req.query.category } }, req.query.details, function (err, materials) {
    if (err) {
      console.log(err);
    } else {
      res.json(materials);
    }
  }).sort({ material_unitPrice: req.query.sort });
});

todoRoutes.route("/addSummary").post(function (req, res) {
  let summary = new Summary(req.body);
  summary
    .save()
    .then(summary => {
      res.status(200).json({ summary: "summary added successfully" });
      console.log("Summary added")
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("adding new summary failed")
    })
})

todoRoutes.route("/addMaterial").post(function (req, res) {
  let material = new Material(req.body);
  material
    .save()
    .then(material => {
      res.status(200).json({ material: "material added successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("adding new material failed");
    });
});

todoRoutes.route("/addMaterialRSI").post(function (req, res) {
  let material = new Material(req.body);

});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

todoRoutes.route("/getMaterials/addToCart").get(async function (req, res) {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  await sleep(2000);
  await cart.add(req.query.id);
  req.session.cart = cart;
  req.session.save();
  res.status(200).json({
    cartMessange: "route run successfully " + req.session.cart.totalQty
  });
});

todoRoutes.route("/deleteMaterial").get(async function (req, res) {
  // var cart = new Cart(req.session.cart ? req.session.cart : {});
  // await sleep(2000);
  // await cart.add(req.query.id);
  console.log('delete route')
  Material.deleteOne({ _id: req.query.id }, function (err, del) {
    console.log(del)
    res.status(200).json({
      cartMessange: "delete route run successfully",
      ifDeleted: del
    });

    // deleted at most one tank document
  });


});

todoRoutes.route("/getMaterials/getCart").get(async function (req, res) {
  var cart = await new Cart(req.session.cart ? req.session.cart : {});
  res.json(cart);
});

todoRoutes.route("/getMaterials/updateCart").get(async function (req, res) {
  var cart = await new Cart(JSON.parse(req.query.cart));
  req.session.cart = cart;
  req.session.save();
});

module.exports = todoRoutes;