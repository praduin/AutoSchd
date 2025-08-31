const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  title: String,
  duration: String,
  time: String,
  expenses: String,
});
const Cartm = mongoose.model("Cartm", cartSchema);
module.exports = Cartm;
