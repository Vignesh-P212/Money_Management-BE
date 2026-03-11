import Asset from "../../models/Asset.js";
import Liability from "../../models/Liability.js";
import Transaction from "../../models/Transaction.js";
import Snapshot from "../../models/Snapshot.js";

const getInsights = async (req, res) => {
  try {

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user."
      });
    }

    const assets = await Asset.find({ user: userId });
    const liabilities = await Liability.find({ user: userId });

    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const totalAssets = assets.reduce(
      (sum, asset) => sum + (asset.value || 0),
      0
    );

    const totalLiabilities = liabilities.reduce(
      (sum, liability) => sum + (liability.amount || 0),
      0
    );

    const netWorth = totalAssets - totalLiabilities;

    const monthlyIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const monthlyExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const savingsRate =
      monthlyIncome > 0
        ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100
        : 0;

    const debtToIncomeRatio =
      monthlyIncome > 0
        ? (totalLiabilities / (monthlyIncome * 12)) * 100
        : 0;

    const cashAssets = assets.filter(asset =>
      ["cash", "bank"].includes(asset.type)
    );

    const emergencyFund = cashAssets.reduce(
      (sum, asset) => sum + (asset.value || 0),
      0
    );

    const emergencyFundCoverage =
      monthlyExpense > 0
        ? emergencyFund / monthlyExpense
        : 0;

    await Snapshot.findOneAndUpdate(
      {
        user: userId,
        month: now.getMonth() + 1,
        year: now.getFullYear()
      },
      {
        totalAssets,
        totalLiabilities,
        netWorth,
        savingsRate
      },
      {
        upsert: true,
        new: true
      }
    );

    const snapshots = await Snapshot
      .find({ user: userId })
      .sort({ year: 1, month: 1 })
      .limit(12);

    res.status(200).json({
      success: true,
      message: "Financial insights fetched successfully.",
      data: {
        totalAssets,
        totalLiabilities,
        netWorth,
        monthlyIncome,
        monthlyExpense,
        savingsRate: Math.round(savingsRate * 100) / 100,
        debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
        emergencyFundCoverage: Math.round(emergencyFundCoverage * 10) / 10,
        snapshots
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default getInsights;