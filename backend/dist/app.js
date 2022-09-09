"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require("http-errors");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
(0, db_1.default)();
const posts_js_1 = __importDefault(require("./routes/posts.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
var app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.json()); // for parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cors_1.default)());
app.use("/post", posts_js_1.default);
app.use("/user", users_js_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
console.log(`server is running on ${process.env.PORT}`);
// error handler
module.exports = app;
