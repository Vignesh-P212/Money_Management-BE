import express from "express";
import protect from "../middleware/authMiddleware.js";
import createTransaction from "../controllers/transaction/createTransaction.js";
import getTransactions from "../controllers/transaction/getTransactions.js";
import updateTransaction from "../controllers/transaction/updateTransaction.js";
import deleteTransaction from "../controllers/transaction/deleteTransaction.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;