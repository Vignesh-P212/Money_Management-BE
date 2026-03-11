import Transaction from "../../models/Transaction.js";

const createTransaction = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { amount, type, category, date } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    if (![amount, type, date].every(field => field !== undefined && field !== null && field !== "")) {
      return res.status(400).json({
        success: false,
        message: "Amount, type and date are required."
      });
    }

    const newTransaction = new Transaction({
      ...req.body,
      user: userId
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction created successfully.",
      data: newTransaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default createTransaction;