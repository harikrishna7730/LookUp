const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./Routes/apis");
const connectDB = require("./db");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
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
