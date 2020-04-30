var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const privateKey = "sdhskdnk";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const menuRouter = require("./routes/Menu");
const categoryRouter = require("./routes/Category");
const userRouter = require("./routes/User");

var app = express();
mongoodConnect = process.env.DB_CONNECTION;
mongoose.connect(mongoodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser untuk parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static("public")); //untuk user bisa akses file folder.
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/menu", validateUser, menuRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], privateKey, (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.body.userId = decoded.id;
    }
  });
}

module.exports = app;
