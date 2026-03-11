import Liability from "../../models/Liability.js";

const getLiabilities = async (req, res) => {
  try {

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    const liabilities = await Liability
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: liabilities
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default getLiabilities;