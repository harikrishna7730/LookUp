const port = process.env.PORT || 3100;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const connectDB = require("./db");

const allowedOrigins = [
  "https://look-up-ashen.vercel.app",
  "https://look-up-admin-cyan.vercel.app",
  "https://lookup-cn6m.onrender.com", // optional: keep if you use local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Database connection with MongoDB
connectDB();

// API creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port", port);
  } else {
    console.log("Error:" + error);
  }
});
