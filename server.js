import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

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
app.use("/api/driver", driverRoutes);

// =======================================
// 🏠 TEST ROUTE
// =======================================
app.get("/", (req, res) => {
  res.send("✅ API Running Successfully");
});

// =======================================
// 🛢️ DATABASE CONNECTION
// =======================================
mongoose
  .connect(
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/bus_tracking"
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });

// =======================================
// 🚀 SERVER START
// =======================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});