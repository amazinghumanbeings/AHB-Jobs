var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const passport = require("passport");
const session = require("express-session");
require("./controllers/googleLogin")(passport);
var authRoute = require("./routes/googleAuth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// var http = require("http");
// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(process.env.port);
// // server.on("error", onError);
// // server.on("listening", onListening);
// console.log("SERVER STARTED ON PORT");

//db ORM
const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// db.sequelize.sync();

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/auth", authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
