const express = require("express");
const Login = require("./models/log");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;
const authRouter = require("./routes/Auth");
const cartm = require("./routes/forcart");
const loginRouter = require("./routes/login");
const viewedRouter = require("./routes/forviewed");
const logout = require("./routes/logout");
const session = require("express-session");
const check = require("./routes/checking");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set secure: true if using HTTPS
  })
);

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
}

app.get("/protected", isLoggedIn, (req, res) => {
  res.json({ message: "This is a protected route" });
});
app.use("/auth", authRouter);
app.use("/log", loginRouter);
app.use("/log", logout);
app.use("/carting", cartm);
app.use("/viewed", viewedRouter);
app.use("/log", check);
app.get("/login", (req, res) => {
  res.send(
    "Login endpoint (POST only). Use the login form to submit credentials."
  );
});

app.get("/signup", (req, res) => {
  res.send("Signup endpoint (POST only). Use the signup form to register.");
});

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello from the backend!",
  };
  res.json(data);
});
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
