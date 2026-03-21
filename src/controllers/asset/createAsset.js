import Asset from "../../models/Asset.js";

const createAsset = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { name, value, type } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    if (![name, value].every(field => field !== undefined && field !== null && field !== "")) {
      return res.status(400).json({
        success: false,
        message: "Asset name and value are required."
      });
    }

    const newAsset = new Asset({
      name,
      value,
      type,
      user: userId
    });

    await newAsset.save();

    res.status(201).json({
      success: true,
      message: "Asset created successfully.",
      data: newAsset
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default createAsset;