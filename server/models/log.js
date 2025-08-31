const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
  username: String,

  email: String,
  password: String,
});

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
