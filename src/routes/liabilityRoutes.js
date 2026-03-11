import express from "express";
import protect from "../middleware/authMiddleware.js";
import createLiability from "../controllers/liability/createLiability.js";
import getLiabilities from "../controllers/liability/getLiabilities.js";
import updateLiability from "../controllers/liability/updateLiability.js";
import deleteLiability from "../controllers/liability/deleteLiability.js";

const router = express.Router();

router.post("/", protect, createLiability);
router.get("/", protect, getLiabilities);
router.put("/:id", protect, updateLiability);
router.delete("/:id", protect, deleteLiability);

export default router;