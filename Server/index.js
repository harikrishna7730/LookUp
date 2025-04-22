const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./Routes/apis");
const connectDB = require("./db");
const path = require("path");

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:3000", 
  "https://look-up-ashen.vercel.app",             
  "https://lookup-cn6m.onrender.com" ,
  "https://look-up-admin-cyan.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
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
