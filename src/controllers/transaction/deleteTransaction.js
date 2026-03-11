import mongoose from "mongoose";
import Transaction from "../../models/Transaction.js";

const deleteTransaction = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID."
      });
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default deleteTransaction;