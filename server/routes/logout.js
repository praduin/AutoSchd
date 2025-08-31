const express = require("express");
const route = express.Router();

route.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    console.log("Session destroyed and cookie cleared");
    res.json({ message: "Logged out" });
  });
  console.log("User logged out");
});

module.exports = route;
