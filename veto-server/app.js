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
//steam oauth and cookies
app.use(passport.initialize());
app.use(passport.session());

//routes

const test = fs.readdirSync("./routes");
test.forEach((file) => {
  const route = require(`./routes/${file}`);
  if (route.path && route.router) {
    console.log("Added router on: " + route.path);
    app.use(route.path, route.router);
  }
});

//json
app.use(express.json());

//statics
app.use(express.static("Website"));
app.use(express.static("Images"));
app.use(express.static("settings"));

app.get("/getuser", (req, res) => {
  if (req.user) {
    res.send(req.user.steamUserData);
  } else {
    res.send({ error: "Not logged in" });
  }
});

app.get("/", (req, res) => {
  res.sendFile("./Website/home.html", { root: __dirname });
});

app.post("/veto", (req, res) => {
  const settings = JSON.parse(fs.readFileSync("./settings/settings.json"));
  const vetostate = JSON.parse(fs.readFileSync("./settings/vetostate.json"));
  const vetos_out = JSON.parse(fs.readFileSync("./settings/vetos-out.json"));
  const veto = req.body.map;

  if (req.user == undefined) {
    res.send({ result: "NOLOGIN" });
  } else if (req.user.steamUserData.personaname == settings.player1) {
    if (vetostate[veto] != 0) {
      res.send({ result: "VETOED" });
      return;
    }
    if (vetos_out.player1.length >= settings.vetoLimit) {
      res.send({ result: "LIMIT" });
      return;
    }
    vetostate[veto] = 1;
    vetos_out.player1.push(veto);
    fs.writeFileSync("./settings/vetostate.json", JSON.stringify(vetostate));
    fs.writeFileSync("./settings/vetos-out.json", JSON.stringify(vetos_out));
    res.send({ result: "SUCCESS" });
  } else if (req.user.steamUserData.personaname == settings.player2) {
    if (vetostate[veto] != 0) {
      res.send({ result: "VETOED" });
      return;
    }
    if (vetos_out.player2.length >= settings.vetoLimit) {
      res.send({ result: "LIMIT" });
      return;
    }
    vetostate[veto] = 1;
    vetos_out.player2.push(veto);
    fs.writeFileSync("./settings/vetostate.json", JSON.stringify(vetostate));
    fs.writeFileSync("./settings/vetos-out.json", JSON.stringify(vetos_out));
    res.send({ result: "SUCCESS" });
  } else {
    res.send({ result: "NOTPLAYING" });
  }
});

app.delete("/veto", (req, res) => {
  const settings = JSON.parse(fs.readFileSync("./settings/settings.json"));
  const vetostate = JSON.parse(fs.readFileSync("./settings/vetostate.json"));
  const vetos_out = JSON.parse(fs.readFileSync("./settings/vetos-out.json"));
  const veto = req.body.map;

  if (req.user == undefined) {
    res.send({ result: "NOLOGIN" });
  } else if (req.user.steamUserData.personaname == settings.player1) {
    if (vetostate[veto] != 1) {
      res.send({ result: "NOTBYU" });
      return;
    }
    vetostate[veto] = 0;
    vetos_out.player1.splice(vetos_out.player1.indexOf(veto), 1);
    fs.writeFileSync("./settings/vetostate.json", JSON.stringify(vetostate));
    fs.writeFileSync("./settings/vetos-out.json", JSON.stringify(vetos_out));
    res.send({ result: "SUCCESS" });
  } else if (req.user.steamUserData.personaname == settings.player2) {
    if (vetostate[veto] != 2) {
      res.send({ result: "NOTBYU" });
      return;
    }
    vetostate[veto] = 0;
    vetos_out.player2.splice(vetos_out.player2.indexOf(veto), 1);
    fs.writeFileSync("./settings/vetostate.json", JSON.stringify(vetostate));
    fs.writeFileSync("./settings/vetos-out.json", JSON.stringify(vetos_out));
    res.send({ result: "SUCCESS" });
  } else {
    res.send({ result: "NOTPLAYING" });
  }
});

app.get("/player", (req, res) => {
  const settings = JSON.parse(fs.readFileSync("./settings/settings.json"));
  //console.log(req.user.steamUserData.personaname, settings.player1);
  if (req.user == undefined) {
    res.redirect("/auth/login");
    return;
  } else if (req.user.steamUserData.personaname == settings.player1) {
    res.sendFile("./Website/veto-submit/player1.html", { root: __dirname });
    return;
  } else if (req.user.steamUserData.personaname == settings.player2) {
    res.sendFile("./Website/veto-submit/player2.html", { root: __dirname });
    return;
  } else {
    res.sendFile("./Website/veto-submit/not-playing.html", { root: __dirname });
    return;
  }
});

app.get("/admin", (req, res) => {
  const settings = JSON.parse(fs.readFileSync("./settings/settings.json"));
  if (req.user == undefined) {
    res.send("you are not logged in");
  } else if (settings.admins.includes(req.user.steamUserData.personaname)) {
    res.sendFile("./Website/admin-panel/panel.html", { root: __dirname });
  } else {
    res.send("you are not an admin");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
