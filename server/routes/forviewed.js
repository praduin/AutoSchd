const express = require("express");
const router = express.Router();
const Viewed = require("../models/viewed");

router.post("/viewed", (req, res) => {
  Viewed.create(req.body)
    .then(() => {
      res.json({ message: "Viewed item added", data: req.body });
    })
    .catch((error) => {
      console.error("Error adding viewed item:", error);
      res.status(500).json({ message: "Failed to add viewed item", error });
    });
});

router.get("/viewed", async (req, res) => {
  try {
    const items = await Viewed.find();
    res.json({ data: items });
  } catch (error) {
    console.error("Error fetching viewed items:", error);
    res.status(500).json({ message: "Failed to fetch viewed items", error });
  }
});

router.delete("/viewed/:id", async (req, res) => {
  try {
    await Viewed.findByIdAndDelete(req.params.id);
    res.json({ message: "Viewed item removed" });
  } catch (error) {
    console.error("Error removing viewed item:", error);
    res.status(500).json({ message: "Failed to remove viewed item", error });
  }
});

module.exports = router;
