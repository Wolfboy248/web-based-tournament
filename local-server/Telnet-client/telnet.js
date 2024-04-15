const net = require("net");
const fs = require("fs");
const EventEmitter = require("events");
const { type } = require("os");
const { times, map } = require("lodash");
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
let clientPub;
let allowp1 = false;
let allowp2 = false;
function sendCommand(command) {
  if (clientPub == undefined) return;
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
    // set times
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
        update = true;
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

    // start race
    if (data.includes("ffo_tourneyStart")) {
      console.log("Tournament started!");

  fetch("http://localhost:3000/tourneystart", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: "Started" 
      }),
      timeout: 10000 // 10 seconds
    })
    .then(response => {
      // handle response
    })
    .catch(error => {
      console.log(error);
    });
  };

    // detect new time
    if (data.includes("is now on")) {
      if (!data.includes("(")) {
        console.log("invalid time input")
        return;
      }
      // data = data.replace(/[\r\n]/g, '');
  
      let name = "";
      let time = "";
      // const pairs = data.split(' ').filter(pair => pair.includes("="));
  
      // pairs.forEach(pair => {
      //     const [key, value] = pair.split('=');
      //     if (key === 'name') {
      //         name = value;
      //     } else if (key === 'time') {
      //         time = value;
      //     }
      // });

      let regex = /(\w+) is now on .*? \((\d+:\d+\.\d+) -> (\d+:\d+\.\d+)\)/;
      if (data.includes("19884")) {
        regex = /(\w+) is now on .*? \((\d+:\d+:\d+\.\d+) -> (\d+:\d+\.\d+)\)/;
      }
      let match = data.match(regex);

      if (match == null) {
        // regex = /.*\((.*) -> (\d+:(?:(\d+):)?(\d+(?:\.\d+)?))\)$/;
        // match = data.match(regex);

        let dataSplit = data.split(" -> ");
        let nameSplit = data.split(" is now on ");
        let name = nameSplit[0];
        console.log(name);
        let timeSplit = dataSplit[1].split(")");
        console.log(timeSplit[0]);
        match = timeSplit[0];
      }

      let dataSplit = data.split(" -> ");
      let nameSplit = data.split(" is now on ");
      let mapSplit = nameSplit[1].split(" (");
      let map = mapSplit[0];
      console.log(map);
      let nameTHING = nameSplit[0];
      let timeSplit = dataSplit[1].split(")");
      console.log(nameTHING);
      console.log(timeSplit[0])

      // console.log(match);
      name = match[1];
      time = match[3];

      fetch("http://localhost:3000/tourneytimesubmit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTHING,
          time: timeSplit[0],
          map: map,
        }),
        timeout: 10000 // 10 seconds
        })
        .then(response => {
          // handle response
        })
        .catch(error => {
          console.log(error);
        });
  
      // console.log("Name:", name);
      // console.log("Time:", time);
    }
  });
}

function updateFile(p1pb, p2pb) {
  let data = JSON.parse(fs.readFileSync("Data/public/data.json"));
  data.match["round" + data.settings.round + "P1PB"] = Math.min(
    parseFloat(p1pb),
    data.match["round" + data.settings.round + "P1PB"]
  );
  data.match["round" + data.settings.round + "P2PB"] = Math.min(
    parseFloat(p2pb),
    data.match["round" + data.settings.round + "P2PB"]
  );
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
