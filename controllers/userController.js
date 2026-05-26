import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { college, busNumber, boardingPoint, arrivalTime } = req.body;

  const user = await User.findById(req.user.id);

  user.college = college;
  user.busNumber = busNumber;
  user.boardingPoint = boardingPoint;
  user.arrivalTime = arrivalTime;

  await user.save();

  res.json({ message: "Profile updated", user });
};