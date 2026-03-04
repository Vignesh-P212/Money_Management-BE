import express from 'express';
import { getLiabilities, createLiability, updateLiability, deleteLiability } from '../controllers/liabilityController';
import { protect } from '../middleware/authMiddleware';

const router=express.Router();
router.route('/').get(protect, getLiabilities).post(protect, createLiability);
router.route('/:id').put(protect, updateLiability).delete(protect, deleteLiability);

export default router;
