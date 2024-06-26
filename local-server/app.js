const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const ws = require("ws");
const telnet = require("./Telnet-client/telnet.js");
require("dotenv").config({ path: "Data/.env" });

const app = express();
//websocket
let clients = [];
const wss = new ws.Server({ port: 8080 });
const wss2 = new ws.Server({ port: 9090 });
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

wss2.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
})

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

//middleware & static files
app.use(express.static("Website/obs-hud"));
app.use(express.static("Website/dashboard"));
app.use(express.static("Main-Images"));
app.use(express.static("Data/public"));
app.use(express.static("Website/fonts"));
app.use(express.static("Website/obs-hud-fullgame"));
app.use(express.static("Website/obs-hud-waiting"));
app.use(morgan("dev"));
app.use(express.json());

//requests
app.get("/dashboard", (req, res) => {
  res.sendFile("./Website/dashboard/index.html", { root: __dirname });
});

app.get("/hud", (req, res) => {
  res.sendFile("./Website/obs-hud/index.html", { root: __dirname });
});

app.get("/fullgame", (req, res) => {
  res.sendFile("./Website/obs-hud-fullgame/index.html", { root: __dirname });
})

app.get("/waiting", (req, res) => {
  res.sendFile("./Website/obs-hud-waiting/index.html", { root: __dirname });
})

app.post("/send-msg", (req, res) => {
  let msg = req.body["message"];
  console.log(msg) + "please";
  sendMsg(msg);
});

app.post("/trigger-action", (req, res) => {
  console.log(req.body.action);
  switch (req.body["action"]) {
    case "timer":
      sendMsg("showtimer");
      break;
    case "randomizer":
      randomizer();
      break;
    case "please":
      console.log("you had better fucking work you dumb bitch fick you")
      sendCommand("echo AAAAAAA");
      break;
    case "advance":
      let time = req.body.msg;
      sendCommand("sar_toast_create speedrun " + time);
  }
  res.end();
});

function sendCommand(cmd) {
  sendMsg(cmd);
  telnet.send(cmd);
}

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

app.post("/telnet-send", (req, res) => {
  telnet.send(req.body.msg);
  console.log(req.body);
  res.end();
});

app.delete("/data", (req, res) => {
  res.end();
  telnet.reset();
});

app.post("/tourneystart", (req, res) => {
  broadcastEvent('tournamentStarted', 'ffo_tourneyStart');
});

app.post("/tourneytimesubmit", (req, res) => {
  let name = req.body.name;
  let time = req.body.time;
  let map = req.body.map;

  broadcastEvent("tournamentTimeSubmit", `ffo_newTime name=${name} time=${time}`);
  broadcastEvent("tournamentMapSubmit", `ffo_newMap ${map}`);
})

app.get("/events", (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Connected');
})

function broadcastEvent(event, data) {
  clients.forEach(client => {
    client.send(data);
  })
}

app.post("/data", (req, res) => {
  let info = JSON.parse(fs.readFileSync("Data/public/data.json"));
  for (let cat in req.body) {
    for (let key in req.body[cat]) {
      info[cat][key] = req.body[cat][key];
    }
  }
  fs.writeFileSync("Data/public/data.json", JSON.stringify(info));
  res.end();
  sendMsg("change");
});

app.use((req, res) => {
  res.status(404).sendFile("./Website/404/index.html", { root: __dirname });
});

function sendMsg(msg) {
  clients.forEach((client) => {
    client.send(msg);
  });
}

async function randomizer() {
  let info = JSON.parse(fs.readFileSync("./Data/public/data.json"));
  let maplist = JSON.parse(fs.readFileSync("./Data/public/maplist.json"));
  let vetos = await (await fetch(info.vetos + "/vetos.json")).json();
  let mapKeys = Object.keys(maplist);
  let map;
  do {
    map = mapKeys[Math.floor(Math.random() * mapKeys.length)];
  } while (
    vetos.player1.includes(map) ||
    vetos.player2.includes(map) ||
    map == "sp" ||
    map == info.match.current_map
  );
  console.log("Random map:", map);
  info.match.random_map = map;
  fs.writeFileSync("./Data/public/data.json", JSON.stringify(info));
  sendMsg("randomizer");
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
  sendMsg("change");
});
