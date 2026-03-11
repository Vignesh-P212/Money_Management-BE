import mongoose from "mongoose";
import Asset from "../../models/Asset.js";

const updateAsset = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid asset ID."
      });
    }

    const asset = await Asset.findOne({ _id: id, user: userId });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found."
      });
    }

    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided."
      });
    }

    Object.assign(asset, updateData);

    await asset.save();

    res.status(200).json({
      success: true,
      message: "Asset updated successfully.",
      data: asset
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default updateAsset;