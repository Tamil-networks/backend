import ValidLocation from "../models/ValidLocation.js";
import User from "../models/User.js";
import { dindigul_buses } from "../config/busRoutes.js";
import { getDistance } from "../utils/distance.js";

// =====================================
// 🚀 SAVE LOCATION (SESSION-BASED)
// =====================================
export const saveLocation = async (req, res) => {
  try {
    console.log("📥 BACKEND RECEIVED:", req.body);

    const { userId, latitude, longitude } = req.body;
    const hour = new Date().getHours();

    // =====================================
    // ⏰ TIME CHECK (7 AM → 9 AM)
    // =====================================
    const isWithinTime = hour >= 7 && hour < 9;

    if (!isWithinTime) {
      console.log("⛔ Outside time → NOT SAVING");
      return res.json({ message: "Outside time window - ignored" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const busData = dindigul_buses[Number(user.busNumber)];
    if (!busData) {
      return res.status(400).json({ message: "Invalid bus number" });
    }

    const stops = busData.stops;
    const checkpoints = busData.checkpoints;

    console.log("🚌 BUS DATA:", busData);

    // =====================================
    // 📏 FIXED RADIUS = 200 METERS
    // =====================================
    const RADIUS = 200;

    // =====================================
    // ✅ STEP 1 — STOPS
    // =====================================
    let isInsideStop = false;

    for (let stop of stops) {
      const distance = getDistance(
        latitude,
        longitude,
        stop.lat,
        stop.lng
      );

      console.log(`📏 Stop ${stop.name}:`, distance);

      if (distance <= RADIUS) {
        isInsideStop = true;
        break;
      }
    }

    // =====================================
    // ✅ STEP 2 — CHECKPOINTS
    // =====================================
    let isInsideCheckpoint = false;

    for (let point of checkpoints) {
      const distance = getDistance(
        latitude,
        longitude,
        point.lat,
        point.lng
      );

      console.log(`📏 Checkpoint ${point.name}:`, distance);

      if (distance <= RADIUS) {
        isInsideCheckpoint = true;
        break;
      }
    }

    // =====================================
    // 🎯 FINAL DECISION
    // =====================================

    if (isInsideStop || isInsideCheckpoint) {
      console.log("🎯 VALID LOCATION");

      const data = await ValidLocation.create({
        userId,
        latitude,
        longitude,
        busNumber: user.busNumber,
        college: user.college,
      });

      return res.json({ message: "Valid", data });
    }

    // ❌ DO NOT STORE INVALID
    console.log("❌ Not in valid zone → NOT SAVING");

    return res.json({ message: "Ignored (outside zone)" });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Error saving location" });
  }
};



// =====================================
// 🗺️ GET VALID USERS (ONLY 7–9 AM)
// =====================================
export const getValidUsers = async (req, res) => {
  try {
    const hour = new Date().getHours();

    // ❌ Outside time → return EMPTY
    if (hour < 7 || hour >= 9) {
      console.log("⛔ Outside time → return empty map");
      return res.json([]);
    }

    const user = await User.findById(req.user.id);

    const users = await ValidLocation.find({
      busNumber: Number(user.busNumber),
      college: user.college,
    }).populate("userId", "name");

    console.log("🗺️ MAP DATA SENT:", users);

    res.json(users);

  } catch (err) {
    console.log("❌ GET VALID USERS ERROR:", err);
    res.status(500).json({ message: "Error" });
  }
};