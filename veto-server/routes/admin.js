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

module.exports = {
  router,
  path: "/admin",
};
