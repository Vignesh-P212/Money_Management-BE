import mongoose from "mongoose";
import Goal from "../../models/Goal.js";

const updateGoal = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal ID."
      });
    }

    const goal = await Goal.findOne({ _id: id, user: userId });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found."
      });
    }

    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided."
      });
    }

    Object.assign(goal, updateData);

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Goal updated successfully.",
      data: goal
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default updateGoal;