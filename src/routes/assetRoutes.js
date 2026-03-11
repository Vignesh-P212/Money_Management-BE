import protect from "../middleware/authMiddleware.js";


import express from "express";

import createAsset from "../controllers/asset/createAsset.js";
import getAssets from "../controllers/asset/getAssets.js";
import updateAsset from "../controllers/asset/updateAsset.js";
import deleteAsset from "../controllers/asset/deleteAsset.js";

const router = express.Router();

router.post("/",protect, createAsset);
router.get("/",protect, getAssets);
router.put("/:id",protect, updateAsset);
router.delete("/:id",protect, deleteAsset);

export default router;