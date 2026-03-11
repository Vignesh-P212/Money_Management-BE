import Goal from "../../models/Goal.js";

const createGoal = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { title, targetAmount, deadline } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    if (![title, targetAmount].every(field => field !== undefined && field !== null && field !== "")) {
      return res.status(400).json({
        success: false,
        message: "Title and target amount are required."
      });
    }

    const newGoal = new Goal({
      title,
      targetAmount,
      deadline,
      user: userId
    });

    await newGoal.save();

    res.status(201).json({
      success: true,
      message: "Goal created successfully.",
      data: newGoal
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default createGoal;