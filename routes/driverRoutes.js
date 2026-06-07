import express from "express";
import { verifyDriverCode } from "../controllers/driverController.js";

const router = express.Router();

router.post("/verify-code", verifyDriverCode);

export default router;