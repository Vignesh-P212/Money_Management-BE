import Transaction from "../../models/Transaction.js";

const getTransactions = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { month, year } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    const filter = { user: userId };

    if (month && year) {

      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);

      filter.date = { $gte: start, $lte: end };
    }

    const transactions = await Transaction
      .find(filter)
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: transactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default getTransactions;