import express from "express";

import {
  saveLocation,
  getValidUsers,
} from "../controllers/locationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// =======================================
// 📍 SAVE LOCATION
// =======================================

// ✅ Background tracking location save
// ❌ NO TOKEN REQUIRED
router.post("/", saveLocation);


// =======================================
// 📡 GET VALID USERS FOR MAP
// =======================================

// ✅ Protected route
router.get(
  "/valid-users",
  protect,
  getValidUsers
);


// =======================================
// ✅ EXPORT
// =======================================
export default router;