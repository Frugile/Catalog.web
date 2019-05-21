const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const todoRoutes = require("./routes/todoRoutes");
const users = require("./routes/users");

const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json({ limit: "5mb" }));

app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true }); // local

const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connection established successfully");
});

app.use(cookieParser());
app.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false } //mp. 60 min =  1000(ms) x 60(s) x 60(min),
  })
);
app.use(function(req, res, next) {
  res.locals.session = session;
  next();
});
app.use("/todos", todoRoutes);
app.use("/users", users);

app.listen(PORT, function() {
  console.log("Servver is running on Port: " + PORT);
});
