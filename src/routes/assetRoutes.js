import express from 'express';

import { getAssets, createAsset, updateAsset, deleteAsset } from '../controllers/assetController';
import { protect } from '../middleware/authMiddleware';

const router=express.Router();
router.route('/').get(protect, getAssets).post(protect, createAsset);
router.route('/:id').put(protect, updateAsset).delete(protect, deleteAsset);

export default router;
