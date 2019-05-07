let Todo = require("../models/todo.model");
let Material = require("../models/material_model");
var Cart = require("../models/cart.model");
const express = require("express");
const todoRoutes = express.Router();

//req - reques object' res = resonse object
todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/getMaterials").get(function(req, res) {
  Material.find(function(err, materials) {
    if (err) {
      console.log(err);
    } else {
      res.json(materials);
    }
  }).sort({ material_code: 1 });
});

todoRoutes.route("/getMaterials/filterPrice").get(function(req, res) {
  Material.find(
    { material_unitPrice: { $gte: req.query.valMin, $lt: req.query.valMax } },
    function(err, materials) {
      if (err) {
        console.log(err);
      } else {
        res.json(materials);
      }
    }
  ).sort({ material_code: 1 });
});

todoRoutes.route("/getMaterials/selectCategory").get(function(req, res) {
  Material.find({ material_category: req.query.val }, function(err, materials) {
    if (err) {
      console.log(err);
    } else {
      res.json(materials);
    }
  }).sort({ material_code: 1 });
});

todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    // res.json(todo);
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route("/add").post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.json("Todo updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

todoRoutes.route("/addMaterial").post(function(req, res) {
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

// todoRoutes.route("/add-to-cart/:id").get(function(req, res) {
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
//   console.log("add cart route");
//   Product.findById(productId, function(err, product) {
//     if (err) {
//       return res.redirect("/");
//     }
//     cart.add(product, product.id);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect("/");
//   });
// });

todoRoutes.route("/getMaterials/addToCart").get(async function(req, res) {
  console.log(">> route /getMaterials/addToCart");
  // console.log(req.query.id);
  // var productId = req.query.id;
  // console.log("cart z sesji przed przypisaniem:");
  console.log(req.sessionID);
  // console.log(req.session.cart);
  // console.log("----");
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  // var cart = new Cart({});
  // console.log("cart pobrany z sesji: ");
  // console.log(cart);
  // cart.addTest(req.query.id);
  await cart.add(req.query.id);
  req.session.cart = cart;
  // req.session.cart.addTest(req.query.id);
  console.log("cart z sesji po przypisaniu:");
  console.log(req.session.cart);
  // console.log(">> end route /getMaterials/addToCart");
  req.session.save();

  res.status(200).json({
    cartMessange: "route run successfully " + req.session.cart.totalQty
  });
});

todoRoutes.route("/getMaterials/getCart").get(async function(req, res) {
  var cart = await new Cart(req.session.cart ? req.session.cart : {});

  console.log("cart z getCart");
  console.log(req.sessionID);
  console.log(cart);
  console.log(cart.generateArray());
  res.json(cart);
});

todoRoutes.route("/getMaterials/updateCart").get(async function(req, res) {
  console.log(">> route /getMaterials/updateCart");
  var cart = await new Cart(JSON.parse(req.query.cart));
  console.log("cart z updateCart");
  console.log(cart);
  req.session.cart = cart;
  req.session.save();
});

// todoRoutes.route("/add-to-cart").get(function(req, res) {
//   console.log("add cart route");
//   var productId = id;

//   // var cart Cartrt(req.session.cart ? req.session.cart : {});
//   Product.findById(productId, function(err, product) {
//     if (err) {
//       return res.redirect("/");
//     }
//     cart.add(product, product.id);
//     req.session.cart = cart;
//     req.session.save();
//     console.log(req.session.cart);
//     res.redirect("/");
//   });
// });

module.exports = todoRoutes;
