import express from 'express';
import { getCharities, createCharity, updateCharity } from '../controllers/charityController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCharities)
  .post(protect, adminOnly, createCharity);

router.route('/:id')
  .put(protect, adminOnly, updateCharity);

export default router;
