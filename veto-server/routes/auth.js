const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const express = require("express");
const router = express.Router();
const path = require("path");

//steam oauth and cookies
passport.serializeUser((user, done) => {
  done(null, { steamUserData: user });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      done(null, profile._json);
    }
  )
);

//routes
router.get("/steam", passport.authenticate("steam"), (req, res) => {
  console.log("authenticating");
});

router.get("/steam/return", passport.authenticate("steam"), (req, res) => {
  console.log("authenticated");
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../Website/login.html"));
});

module.exports = { router, path: "/auth" };
