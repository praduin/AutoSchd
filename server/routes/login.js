const express = require("express");
const router = express.Router();
const Login = require("../models/log");

router.post("/login", (req, res) => {
  Login.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (user) {
        req.session.user = { id: user._id, email: user.email };
        req.session.save(() => {
          res.json({ message: "Login successful", data: user });
        });
      } else {
        console.warn(
          "Login failed: Invalid credentials for email:",
          req.body.email
        );
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login error", error: err });
    });
});

module.exports = router;
