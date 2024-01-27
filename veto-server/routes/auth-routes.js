const router = require("express").Router();

//auth login
router.get("/login", (req, res) => {
  res.sendFile("./login.html", { root: __dirname });
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out");
});

//google auth
router.get("/google", (req, res) => {
  //handle with passport
  res.send("logging in with google");
});

module.exports = router;
