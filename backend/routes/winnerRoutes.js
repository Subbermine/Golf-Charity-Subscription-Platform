import express from 'express';
import { uploadProof, getMyWinnings, verifyWinner } from '../controllers/winnerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload-proof', protect, uploadProof);
router.get('/my', protect, getMyWinnings);
router.put('/:id/verify', protect, adminOnly, verifyWinner);

export default router;
