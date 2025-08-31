const express = require("express");

const router = express.Router();
const Login = require("../models/log");
router.post("/signup", (req, res) => {
  Login.create(req.body)
    .then(() => {
      res.json({ message: "Signup successful", data: req.body });
    })
    .catch((error) => {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Signup failed", error });
    });
});

module.exports = router;
