import express from 'express';
import { runDraw, publishResults, getLatestDraw, getDrawHistory, getAdminLatestDraw } from '../controllers/drawController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/run', protect, adminOnly, runDraw);
router.put('/:id/publish', protect, adminOnly, publishResults);
router.get('/latest', getLatestDraw);
router.get('/admin/latest', protect, adminOnly, getAdminLatestDraw);
router.get('/history', getDrawHistory);

export default router;
