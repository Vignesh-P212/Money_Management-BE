import mongoose from "mongoose";
import Liability from "../../models/Liability.js";

const updateLiability = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid liability ID."
      });
    }

    const liability = await Liability.findOne({
      _id: id,
      user: userId
    });

    if (!liability) {
      return res.status(404).json({
        success: false,
        message: "Liability not found."
      });
    }

    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided."
      });
    }

    Object.assign(liability, updateData);

    await liability.save();

    res.status(200).json({
      success: true,
      message: "Liability updated successfully.",
      data: liability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default updateLiability;