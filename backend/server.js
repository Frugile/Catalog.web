const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const todoRoutes = require("./routes/todoRoutes");

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connection established successfully");
});

app.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection }),
    cookie: { maxAge: 60 * 60 * 1000 } //mp. 60 min =  1000(ms) x 60(s) x 60(min)
  })
);
app.use(function(req, res, next) {
  res.locals.session = session;
  next();
});
app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Servver is running on Port: " + PORT);
});
