import mongoose from "mongoose";

const validLocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  latitude: Number,
  longitude: Number,

  // 🔥 ADD THESE (MISSING BEFORE)
  busNumber: Number,
  college: String,

  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ValidLocation", validLocationSchema);