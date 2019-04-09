const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

const todoRoutes = require("./routes/todoRoutes");

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connection established successfully");
});

app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Servver is running on Port: " + PORT);
});
