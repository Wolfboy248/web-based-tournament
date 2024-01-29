const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.use(express.json());

router.get("/", (req, res) => {
  const settings = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../settings/settings.json"))
  );
  if (req.user == undefined) {
    res.redirect("/auth/steam");
    return;
  }
  if (settings.admins.includes(req.user.steamUserData.personaname)) {
    res.sendFile(path.join(__dirname, "../Website/admin-panel/admin.html"));
  } else {
    res.redirect("/");
  }
});

router.post("/playerchange", (req, res) => {
  const settings = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../settings/settings.json"))
  );
  if (req.user == undefined) {
    res.redirect("/auth/steam");
    return;
  }
  if (settings.admins.includes(req.user.steamUserData.personaname)) {
    settings.player1 = req.body.player1Name;
    settings.player2 = req.body.player2Name;
    fs.writeFileSync(
      path.join(__dirname, "../settings/settings.json"),
      JSON.stringify(settings)
    );
    res.send("success");
  } else {
    res.redirect("/");
  }
});

router.delete("/adminchange", (req, res) => {
  const settings = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../settings/settings.json"))
  );
  if (req.user == undefined) {
    res.redirect("/auth/steam");
    return;
  } else if (req.user.steamUserData.personaname == req.body.admin) {
    res.send("You can't remove yourself!");
    return;
  } else if (settings.admins.includes(req.user.steamUserData.personaname)) {
    if (req.body.admin == "Archer the real") {
      res.send("You can't remove Archer the real! FUCK YOU!!!!!!");
      return;
    }
    settings.admins = settings.admins.filter(
      (admin) => admin != req.body.admin
    );
    fs.writeFileSync(
      path.join(__dirname, "../settings/settings.json"),
      JSON.stringify(settings)
    );
    res.send("success");
  }
});

router.post("/adminchange", (req, res) => {
  const settings = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../settings/settings.json"))
  );
  if (req.user == undefined) {
    res.redirect("/auth/steam");
    return;
  } else if (settings.admins.includes(req.body.admin)) {
    res.send("Admin already added!!!!!");
  } else if (settings.admins.includes(req.user.steamUserData.personaname)) {
    settings.admins.push(req.body.admin);
    fs.writeFileSync(
      path.join(__dirname, "../settings/settings.json"),
      JSON.stringify(settings)
    );
    res.send("success");
  }
});

module.exports = {
  router,
  path: "/admin",
};
