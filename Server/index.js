const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./Routes/apis");
const connectDB = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/Upload", express.static("Upload"));

connectDB();

// Use API routes
app.use("/api", apiRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
