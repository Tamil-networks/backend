import User from "../models/User.js";

// ======================================
// GET PROFILE
// ======================================
export const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    res.json(user);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// UPDATE PROFILE
// ======================================
export const updateProfile = async (req, res) => {

  try {

    const {
      college,
      busNumber,
      boardingPoint,
      arrivalTime,
    } = req.body;

    const user = await User.findById(
      req.user.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    // ======================================
    // DRIVER
    // ======================================
    if (user.role === "driver") {

      user.college =
        college || user.college;

      user.busNumber =
        busNumber || user.busNumber;
    }

    // ======================================
    // STUDENT
    // ======================================
    else {

      user.college =
        college || user.college;

      user.busNumber =
        busNumber || user.busNumber;

      user.boardingPoint =
        boardingPoint || user.boardingPoint;

      user.arrivalTime =
        arrivalTime || user.arrivalTime;
    }

    await user.save();

    res.json({
      message: "Profile Updated",
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};