const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

//middleware & static files
app.use(express.static("Website/obs-hud"));
app.use(express.static("Website/dashboard"));
app.use(express.static("Main-Images"));
app.use(express.static("Data/public"));
app.use(morgan("dev"));

//requests
app.get("/dashboard", (req, res) => {
  res.sendFile("./Website/dashboard/index.html", { root: __dirname });
});

app.get("/hud", (req, res) => {
  res.sendFile("./Website/obs-hud/index.html", { root: __dirname });
});

app.get("/get-file", (req, res) => {
  console.log(req.body);
  //fs.readFile(`./Data/public/${req.body}`)
});

/*app.use((req, res) => {
  res.status(404).sendFile("./Website/404/index.html", { root: __dirname });
});*/
