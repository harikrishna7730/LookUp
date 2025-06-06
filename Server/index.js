const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./Routes/apis");
const connectDB = require("./db");
const path = require("path");

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  "https://look-up-ashen.vercel.app",              // deployed frontend
  "http://localhost:3100",              // deployed backend (if needed)
  "https://look-up-admin-cyan.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
// Serve static files (uploaded images)
app.use("/Upload/images", express.static(path.join(__dirname, "Upload/images")));

connectDB();

// Use API routes
app.use("/", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3100");
});
