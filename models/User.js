import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  college: String,
  busNumber: String,
  boardingPoint: String,
  arrivalTime: String,
  role: {
    type: String,
    enum: ["student", "driver"],
    default: "student",
  },
});

export default mongoose.model("User", userSchema);