const net = require("net");
const fs = require("fs");
const EventEmitter = require("events");
const { type } = require("os");
class MyEmitter extends EventEmitter {}
const events = new MyEmitter();

module.exports = {
  connectToGame,
  events,
  send: sendCommand,
  destory,
  reset,
};

const options = {
  host: "127.0.0.1",
  port: 60,
};

function unformatTime(text) {
  if (text.includes(":")) {
    const parts = text.split(":");
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(text);
}
let client;
let allowp1 = false;
let allowp2 = false;
function sendCommand(command) {
  console.log("Sending command: " + command);
  clientPub.write(command + "\r\n");
}
function connectToGame() {
  client = net.createConnection(options);
  client.on("connect", () => {
    events.emit("connect");
  });
  client.on("close", () => {
    events.emit("close");
  });
  client.on("error", (error) => {
    console.log(error.errno, error.code, error.address + ":" + error.port);
    events.emit("error");
  });
  client.on("timeout", () => {
    events.emit("timeout");
  });
  clientPub = client;
  client.on("data", (data) => {
    let p1pb = 9999;
    let p2pb = 9999;
    data = data.toString();
    if (data.includes("has finished on")) {
      let split = data.split("has finished on");
      let [name, playerMap, time] = [
        split[0].slice(0, -1),
        split[1].split(" ")[1],
        split[1].split("in ")[1].slice(0, -1),
      ];
      let fTime = parseFloat(unformatTime(time).toFixed(2));
      let info = JSON.parse(fs.readFileSync("Data/public/data.json"));
      if (info.settings.active == true) {
        allowp1 = true;
        allowp2 = true;
      }
      if (playerMap != info.match.current_map) return;
      let update = false;
      if (
        name == info.match.player1 &&
        fTime < info.match["round" + info.settings.round + "P1PB"] &&
        allowp1
      ) {
        console.log(`New pb for ${name}: ${time}`);
        p1pb = fTime;
        update = true;
      } else if (
        name == info.match.player2 &&
        fTime < info.match["round" + info.settings.round + "P2PB"] &&
        allowp2
      ) {
        console.log(`New pb for ${name}: ${time}`);
        p2pb = fTime;
        uppdate = true;
      }
      if (update) updateFile(p1pb, p2pb);
    } else if (data.includes("is now on")) {
      let info = JSON.parse(fs.readFileSync("Data/public/data.json"));
      let split = data.split("is now on");
      let name = split[0].slice(0, -1);
      if (info.settings.active == false) {
        if (name == info.match.player1) allowp1 = false;
        else if (name == info.match.player2) allowp2 = false;
      }
    }
  });
}

function updateFile(p1pb, p2pb) {
  let data = JSON.parse(fs.readFileSync("Data/public/data.json"));
  data.match["round" + data.settings.round + "P1PB"] = parseFloat(p1pb);
  data.match["round" + data.settings.round + "P2PB"] = parseFloat(p2pb);
  fs.writeFileSync("Data/public/data.json", JSON.stringify(data));
  events.emit("update");
}

function reset() {
  let data = JSON.parse(fs.readFileSync("Data/public/data.json"));
  data.match.round1P1PB = 9999;
  data.match.round1P2PB = 9999;
  data.match.round2P1PB = 9999;
  data.match.round2P2PB = 9999;
  data.match.round3P1PB = 9999;
  data.match.round3P2PB = 9999;

  fs.writeFileSync("Data/public/data.json", JSON.stringify(data));
  events.emit("update");
}

function destory() {
  client.end();
}
