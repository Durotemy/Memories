var createError = require("http-errors");
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db";

dotenv.config();
connectDB();

import posts from "./routes/posts.js";
import users from "./routes/users.js";
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/post", posts);
app.use("/user", users);
app.get("/", (req, res) => {
  res.send("app is running");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
const port = process.env.PORT || 1337;
console.log(`server is running on ${port}`);
// error handler

module.exports = app;
