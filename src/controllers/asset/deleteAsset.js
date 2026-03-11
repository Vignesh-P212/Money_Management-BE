import mongoose from "mongoose";
import Asset from "../../models/Asset.js";

const deleteAsset = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid asset ID."
      });
    }

    const asset = await Asset.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default deleteAsset;