const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const ws = require("ws");
const authRoutes = require("./routes/auth-routes.js");

const app = express();

//set up routes
app.use("/auth", authRoutes);

//home route
app.get("/", (req, res) => {
  res.sendFile("./Website/index.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
