const express = require("express");
const Router = express.Router();

Router.get("/check", (req, res) => {
  if (req.session && req.session.user) {
    console.log("User is logged in:", req.session.user);
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    console.log("User is NOT logged in");
    res.json({ loggedIn: false });
  }
});
module.exports = Router;
