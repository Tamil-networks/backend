import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  latitude: Number,
  longitude: Number,     
  busNumber: String,
  college: String,
  
  currentStopIndex: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["valid", "invalid"],
    default: "invalid",
  },

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Location", locationSchema);