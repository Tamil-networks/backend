import express from "express";

import {
  registerUser,
  loginUser,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();


// ======================================
// 🚀 REGISTER ROUTE
// ======================================
router.post(
  "/register",

  (req, res, next) => {

    console.log("🔥 REGISTER ROUTE HIT");

    console.log("📥 REGISTER BODY:", req.body);

    next();
  },

  registerUser
);


// ======================================
// 🔐 LOGIN ROUTE
// ======================================
router.post(
  "/login",

  (req, res, next) => {

    console.log("🔥 LOGIN ROUTE HIT");

    console.log("📥 LOGIN BODY:", req.body);

    next();
  },

  loginUser
);
router.post(
  "/reset-password",
  resetPassword
);


export default router;