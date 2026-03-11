import Asset from "../../models/Asset.js";

const getAssets = async (req, res) => {
  try {

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    const assets = await Asset
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assets
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default getAssets;