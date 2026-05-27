import mongoose from "mongoose";

const validLocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },

  // Bus details
  busNumber: {
    type: Number,
    default: null,
  },

  college: {
    type: String,
    default: "",
  },

  // Save current time automatically
  time: {
    type: Date,
    default: Date.now,
  },
});

// 🔥 Automatically delete data after 24 hours
// Next day old locations removed automatically
validLocationSchema.index(
  { time: 1 },
  { expireAfterSeconds: 10800 } // 10800 seconds = 3 hours
);

export default mongoose.model("ValidLocation", validLocationSchema);