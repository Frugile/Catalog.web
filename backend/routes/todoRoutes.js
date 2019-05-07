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
  Material.find({}, req.query.details, function(err, materials) {
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
  Material.find({ material_category: {$in: req.query.category} }, req.query.details, function(err, materials) {
    if (err) {
      console.log(err);
    } else {
      res.json(materials);
    }
  }).sort({ material_unitPrice: req.query.sort });
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

todoRoutes.route("/getMaterials/addToCart").get(async function(req, res) {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  await cart.add(req.query.id);
  req.session.cart = cart;
  req.session.save();
  res.status(200).json({
    cartMessange: "route run successfully " + req.session.cart.totalQty
  });
});

todoRoutes.route("/getMaterials/getCart").get(async function(req, res) {
  var cart = await new Cart(req.session.cart ? req.session.cart : {});
  res.json(cart);
});

todoRoutes.route("/getMaterials/updateCart").get(async function(req, res) {
  var cart = await new Cart(JSON.parse(req.query.cart));
  req.session.cart = cart;
  req.session.save();
});

module.exports = todoRoutes;