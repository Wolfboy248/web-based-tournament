const net = require("net");
const fs = require("fs");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const events = new MyEmitter();

module.exports = {
  connectToGame,
  events,
  send: sendCommand,
  destory,
};

const options = {
  port: 60,
  host: '127.0.0.1',
};

function unformatTime(text) {
  if (text.includes(":")) {
    const parts = text.split(":");
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(text);
}
let client;
function sendCommand(command) {
  clientPub.write(command + "\r\n");
}
function connectToGame() {
  console.log("AKLJFDKGLDGJ")
  client = net.createConnection(options);
  client.on("connect", () => {
    events.emit("connect");
    sendCommand("terst");
  });
  client.on("close", () => {
    events.emit("close");
  });
  client.on("error", (wasd) => {
    events.emit("error");
    console.log(wasd)
  });
  client.on("timeout", () => {
    events.emit("timeout");
  });
  clientPub = client;
  client.on("data", (data) => {
    data = data.toString();
    console.log(data)
    if (data.includes("has finished on")) {
      let split = data.split("has finished on");
      let [name, playerMap, time] = [
        split[0].slice(0, -1),
        split[1].split(" ")[1],
        split[1].split("in ")[1].slice(0, -1),
      ];
      let fTime = unformatTime(time);
      let info = JSON.parse(fs.readFileSync("Data/public/data.json"));
      if (info.settings.active == false) return;
      if (playerMap != info.match.current_map) return;
      if (name == info.match.player1 && fTime < p1pb) {
        console.log(`New pb for ${name}: ${time}`);
        p1pb = fTime;
      } else if (name == info.match.player2 && fTime < p2pb) {
        console.log(`New pb for ${name}: ${time}`);
        p2pb = fTime;
      }
      updateFile();
    }
  });
}

function updateFile() {
  let data = JSON.parse(fs.readFileSync("Data/public/data.json"));
  data.match["round" + data.settings.round + "P1PB"] = p1pb.toString();
  data.match["round" + data.settings.round + "P2PB"] = p2pb.toString();
  fs.writeFileSync("Data/public/data.json", JSON.stringify(data));
  events.emit("update");
}

function reset() {
  let data = JSON.parse(fs.readFileSync("Data/public/data.json"));
  data.match = {
    player1: data.match.player1,
    player2: data.match.player2,
    round1P1PB: "9999",
    round1P2PB: "9999",
    round2P1PB: "9999",
    round2P2PB: "9999",
    round3P1PB: "9999",
    round3P2PB: "9999",
    name: data.match.name,
    current_map: data.match.current_map,
  };
  fs.writeFileSync("Data/public/data.json", JSON.stringify(data));
  events.emit("update");
}

function destory() {
  client.end();
}
