import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ======================================
// 🔐 GENERATE JWT TOKEN
// ======================================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// ======================================
// ✅ REGISTER USER
// ======================================
export const registerUser = async (req, res) => {

  try {

    console.log("🔥 REGISTER ROUTE HIT");

    console.log("📥 REGISTER BODY:", req.body);

    const {
      name,
      email,
      password,
      college,
      busNumber,
      boardingPoint,
      arrivalTime,
      role,
    } = req.body;

    // ==============================
    // ✅ VALIDATION
    // ==============================
    if (
      !name ||
      !email ||
      !password ||
      !college ||
      !busNumber
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (
     role !== "driver" &&
     (!boardingPoint || !arrivalTime)
    ) {
      return res.status(400).json({
        message:
         "Boarding Point and Arrival Time are required",
      });
    }

    // ==============================
    // ✅ CHECK USER
    // ==============================
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {

      console.log("❌ User already exists");

      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ==============================
    // 🔐 HASH PASSWORD
    // ==============================
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // ==============================
    // ✅ CREATE USER
    // ==============================
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      busNumber,
      boardingPoint:
        role === "driver"
          ? ""
          : boardingPoint,
      arrivalTime:
        role === "driver"
          ? ""
          : arrivalTime,
      role: role || "student",
    });

    console.log("✅ USER REGISTERED");

    // ==============================
    // ✅ RESPONSE
    // ==============================
    res.status(201).json({

      message: "User registered successfully",

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        busNumber: user.busNumber,
        boardingPoint: user.boardingPoint,
        arrivalTime: user.arrivalTime,
        role: user.role,
      },
    });

  } catch (error) {

    console.log("❌ REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================
// ✅ LOGIN USER
// ======================================
export const loginUser = async (req, res) => {

  try {

    console.log("🔥 LOGIN ROUTE HIT");

    console.log("📥 LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // ==============================
    // ✅ FIND USER
    // ==============================
    const user = await User.findOne({
      email,
    });

    if (!user) {

      console.log("❌ User not found");

      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // ==============================
    // 🔐 CHECK PASSWORD
    // ==============================
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      console.log("❌ Invalid Password");

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    console.log("✅ LOGIN SUCCESS");

    // ==============================
    // ✅ RESPONSE
    // ==============================
    res.json({

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        busNumber: user.busNumber,
        boardingPoint: user.boardingPoint,
        arrivalTime: user.arrivalTime,
        role: user.role,
      },
    });

  } catch (error) {

    console.log("❌ LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// ======================================
// RESET PASSWORD
// ======================================
export const resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and New Password required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      message: "Password Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};