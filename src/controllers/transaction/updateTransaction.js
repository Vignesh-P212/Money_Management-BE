import mongoose from "mongoose";
import Transaction from "../../models/Transaction.js";

const updateTransaction = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID."
      });
    }

    const transaction = await Transaction.findOne({
      _id: id,
      user: userId
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found."
      });
    }

    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided."
      });
    }

    Object.assign(transaction, updateData);

    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully.",
      data: transaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default updateTransaction;