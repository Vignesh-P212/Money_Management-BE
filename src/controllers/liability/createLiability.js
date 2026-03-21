import Liability from "../../models/Liability.js";

const createLiability = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { name, amount, type,interestRate } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    if (![name, amount].every(field => field !== undefined && field !== null && field !== "")) {
      return res.status(400).json({
        success: false,
        message: "Liability name and amount are required."
      });
    }

    const newLiability = new Liability({
      name,
      amount,
      type,
      interestRate,
      user: userId
    });

    await newLiability.save();

    res.status(201).json({
      success: true,
      message: "Liability created successfully.",
      data: newLiability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default createLiability;