const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const ws = require("ws");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const e = require("express");

const app = express();

app.use(morgan("dev"));
app.use(
  session({
    saveUninitialized: true,
    secret: process.env.COOKIE_KEY,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const test = fs.readdirSync("./routes");
test.forEach((file) => {
  const route = require(`./routes/${file}`);
  if (route.path && route.router) {
    console.log("Added router on: " + route.path);
    app.use(route.path, route.router);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
