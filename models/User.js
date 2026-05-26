import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  college: String,
  busNumber: String,
  boardingPoint: String,
  arrivalTime: String
});

export default mongoose.model("User", userSchema);