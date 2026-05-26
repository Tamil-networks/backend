import mongoose from "mongoose";

const invalidLocationSchema = new mongoose.Schema({
  userId: String,
  latitude: Number,
  longitude: Number,
  time: { type: Date, default: Date.now }
});

export default mongoose.model("InvalidLocation", invalidLocationSchema);