const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const ws = require("ws");

const app = express();

//websocket
let clients = [];
const wss = new ws.Server({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("New client connected!");
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

//middleware & static files
app.use(express.static("Website/obs-hud"));
app.use(express.static("Website/dashboard"));
app.use(express.static("Main-Images"));
app.use(express.static("Data/public"));
app.use(express.static("Website/fonts"));
app.use(morgan("dev"));
app.use(express.json());

//requests
app.get("/dashboard", (req, res) => {
  res.sendFile("./Website/dashboard/index.html", { root: __dirname });
});

app.get("/hud", (req, res) => {
  res.sendFile("./Website/obs-hud/index.html", { root: __dirname });
});

app.post("/send-msg", (req, res) => {
  let msg = req.body["message"];
  console.log(msg);
  sendMsg(msg);
});

app.post("/set-map/:mapname", (req, res) => {
  let info = JSON.parse(fs.readFileSync("./Data/public/data.json"));
  info["match"]["current_map"] = req.params["mapname"];
  fs.writeFileSync("./Data/public/data.json", JSON.stringify(info));
  sendMsg("datachange");
  res.end();
});

app.post("/set-round/:round", (req, res) => {
  let info = JSON.parse(fs.readFileSync("./Data/public/data.json"));
  info["settings"]["round"] = parseInt(req.params["round"]);
  fs.writeFileSync("./Data/public/data.json", JSON.stringify(info));
  sendMsg("statechange");
  res.end();
});

app.post("/set-mode/:mode", (req, res) => {
  let info = JSON.parse(fs.readFileSync("./Data/public/data.json"));
  info["settings"]["mode"] = parseInt(req.params["mode"]);
  fs.writeFileSync("./Data/public/data.json", JSON.stringify(info));
  sendMsg("statechange");
  res.end();
});

app.post("/trigger-action", (req, res) => {
  switch (req.body["action"]) {
    case "timer":
      sendMsg("showtimer");
      break;
    case "randomizer":
      sendMsg("showrandomizer");
      break;
  }
  res.end();
});

app.use((req, res) => {
  res.status(404).sendFile("./Website/404/index.html", { root: __dirname });
});

function sendMsg(msg) {
  clients.forEach((client) => {
    client.send(msg);
  });
}
