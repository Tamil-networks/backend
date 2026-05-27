import ValidLocation from "../models/ValidLocation.js";
import User from "../models/User.js";
import { dindigul_buses } from "../config/busRoutes.js";
import { getDistance } from "../utils/distance.js";

// =====================================
// 🚀 SAVE LOCATION
// =====================================
export const saveLocation = async (req, res) => {
  try {

    console.log("📥 BACKEND RECEIVED:", req.body);

    const { userId, latitude, longitude } = req.body;

    const hour = new Date().getHours();

    // =====================================
    // ⏰ SAVE ONLY 7AM → 9AM
    // =====================================
    const isWithinTime = hour >= 7 && hour < 9;

    if (!isWithinTime) {

      console.log("⛔ Outside time → NOT SAVING");

      return res.json({
        message: "Outside time window - ignored",
      });
    }

    // =====================================
    // 👤 FIND USER
    // =====================================
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =====================================
    // 🚌 GET BUS DATA
    // =====================================
    const busData =
      dindigul_buses[Number(user.busNumber)];

    if (!busData) {
      return res.status(400).json({
        message: "Invalid bus number",
      });
    }

    const stops = busData.stops;
    const checkpoints = busData.checkpoints;

    console.log("🚌 BUS DATA:", busData);

    // =====================================
    // 📏 FIXED RADIUS = 200M
    // =====================================
    const RADIUS = 200;

    // =====================================
    // ✅ CHECK STOPS
    // =====================================
    let isInsideStop = false;

    for (let stop of stops) {

      const distance = getDistance(
        latitude,
        longitude,
        stop.lat,
        stop.lng
      );

      console.log(
        `📏 Stop ${stop.name}:`,
        distance
      );

      if (distance <= RADIUS) {
        isInsideStop = true;
        break;
      }
    }

    // =====================================
    // ✅ CHECK CHECKPOINTS
    // =====================================
    let isInsideCheckpoint = false;

    for (let point of checkpoints) {

      const distance = getDistance(
        latitude,
        longitude,
        point.lat,
        point.lng
      );

      console.log(
        `📏 Checkpoint ${point.name}:`,
        distance
      );

      if (distance <= RADIUS) {
        isInsideCheckpoint = true;
        break;
      }
    }

    // =====================================
    // 🎯 VALID LOCATION
    // =====================================
    if (isInsideStop || isInsideCheckpoint) {

      console.log("🎯 VALID LOCATION");

      // =====================================
      // 🧹 REMOVE OLD USER LOCATION
      // =====================================
      await ValidLocation.deleteMany({
        userId,
      });

      // =====================================
      // 💾 SAVE NEW LOCATION
      // =====================================
      const data = await ValidLocation.create({
        userId,
        latitude,
        longitude,
        busNumber: user.busNumber,
        college: user.college,
      });

      return res.json({
        message: "Valid",
        data,
      });
    }

    // =====================================
    // ❌ INVALID LOCATION
    // =====================================
    console.log(
      "❌ Not in valid zone → NOT SAVING"
    );

    return res.json({
      message: "Ignored (outside zone)",
    });

  } catch (error) {

    console.log("❌ ERROR:", error);

    res.status(500).json({
      message: "Error saving location",
    });
  }
};

// =====================================
// 🗺️ GET VALID USERS
// =====================================
export const getValidUsers = async (req, res) => {

  try {

    const hour = new Date().getHours();

    // =====================================
    // ⛔ AFTER 10AM RETURN EMPTY
    // =====================================
    if (hour >= 10) {

      console.log(
        "⛔ After 10AM → return empty map"
      );

      return res.json([]);
    }

    // =====================================
    // 👤 CURRENT USER
    // =====================================
    const user = await User.findById(
      req.user.id
    );

    // =====================================
    // 📍 GET SAME BUS USERS
    // =====================================
    const users = await ValidLocation.find({
      busNumber: Number(user.busNumber),
      college: user.college,
    }).populate("userId", "name");

    console.log("🗺️ MAP DATA SENT:", users);

    res.json(users);

  } catch (err) {

    console.log(
      "❌ GET VALID USERS ERROR:",
      err
    );

    res.status(500).json({
      message: "Error",
    });
  }
};