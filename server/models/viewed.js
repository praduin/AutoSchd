const mongoose = require("mongoose");
const viewedSchema = new mongoose.Schema({
  title: String,
  duration: String,
  time: String,
  expenses: String,
});
const Viewed = mongoose.model("Viewed", viewedSchema);
module.exports = Viewed;
