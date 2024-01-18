const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const ws = require("ws");
const telnet = require("./Telnet-client/telnet.js");

const app = express();

//websocket
let clients = [];
const wss = new ws.Server({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("NEW WEBSOCKET CONNECTION");
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });

  //for dashboard refresh

  if (telnetConnected) ws.send("telnet-connect");
  else ws.send("telnet-close");
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
  console.log(req.body.action);
  switch (req.body["action"]) {
    case "timer":
      sendMsg("showtimer");
      break;
    case "randomizer":
      sendMsg("randomizer");
      break;
  }
  res.end();
});

let telnetConnected = false;
app.post("/telnet", (req, res) => {
  res.end();
  if (telnetConnected) return;
  telnet.connectToGame();
});

app.delete("/telnet", async (req, res) => {
  res.end();
  if (!telnetConnected) return;
  telnet.destory();
});

app.post("/change-player", (req, res) => {
  let info = JSON.parse(fs.readFileSync("Data/public/data.json"));
  info.match.player1 = req.body.player1;
  info.match.player2 = req.body.player2;
  fs.writeFileSync("Data/public/data.json", JSON.stringify(info));
  sendMsg("datachange");
  res.end();
});

app.delete("/data", (req, res) => {
  res.end();
  telnet.reset();
});

app.use((req, res) => {
  res.status(404).sendFile("./Website/404/index.html", { root: __dirname });
});

function sendMsg(msg) {
  clients.forEach((client) => {
    client.send(msg);
  });
}

//telnet stuff
telnet.events.on("connect", () => {
  console.log("NEW TELNET CONNECTION");
  telnetConnected = true;
  sendMsg("telnet-connect");
});
telnet.events.on("close", () => {
  telnetConnected = false;
  sendMsg("telnet-close");
});
telnet.events.on("error", () => {
  telnetConnected = false;
  sendMsg("telnet-error");
});
telnet.events.on("timeout", () => {
  telnetConnected = false;
  sendMsg("telnet-timeout");
});
telnet.events.on("update", () => {
  console.log("update");
  sendMsg("datachange");
});
