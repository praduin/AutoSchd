const express = require("express");
const router = express.Router();
const Cartm = require("../models/cart");
router.post("/cart", (req, res) => {
  Cartm.create(req.body)
    .then(() => {
      res.json({ message: "cart data added", data: req.body });
    })
    .catch((error) => {
      console.error("Error adding cart data:", error);
      res.status(500).json({ message: "Failed to add cart data", error });
    });
});
// Add DELETE route to remove a cart item by id
router.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cartm.findByIdAndDelete(id);
    res.json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Failed to remove cart item", error });
  }
});

module.exports = router;
// Add GET route to fetch all cart items
router.get("/cart", async (req, res) => {
  try {
    const items = await Cartm.find();
    res.json({ data: items });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Failed to fetch cart data", error });
  }
});
