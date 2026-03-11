import express from "express";
import protect from "../middleware/authMiddleware.js";
import createGoal from "../controllers/goal/createGoal.js";
import getGoals from "../controllers/goal/getGoals.js";
import updateGoal from "../controllers/goal/updateGoal.js";
import deleteGoal from "../controllers/goal/deleteGoal.js";

const router = express.Router();

router.post("/", protect, createGoal);
router.get("/", protect, getGoals);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

export default router;