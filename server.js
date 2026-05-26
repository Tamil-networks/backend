import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import ValidLocation from "./models/ValidLocation.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// =======================================
// 🔧 MIDDLEWARE
// =======================================
app.use(cors());
app.use(express.json());

// =======================================
// 🛣️ ROUTES
// =======================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/location", locationRoutes);

// =======================================
// 🏠 TEST ROUTE
// =======================================
app.get("/", (req, res) => {
  res.send("✅ API Running Successfully");
});

setInterval(async () => {
  const hour = new Date().getHours();

  if (hour >= 9) {
    console.log("🧹 Clearing all location data...");
    await ValidLocation.deleteMany({});
  }
}, 5 * 60 * 1000); // every 5 mins

// =======================================
// 🛢️ DATABASE CONNECTION
// =======================================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bus_tracking")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// =======================================
// 🚀 SERVER START
// =======================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});