export const verifyDriverCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (code === process.env.DRIVER_SECRET) {
      return res.json({
        success: true,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Driver Code",
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};