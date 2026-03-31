import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  subscribe, 
  getSubscriptionStatus 
} from '../controllers/userController.js';
import { addScore, getScores } from '../controllers/scoreController.js';
import { protect } from '../middleware/authMiddleware.js';
import { subscribedOnly } from '../middleware/subscriptionMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/subscribe', protect, subscribe);
router.get('/subscription/status', protect, getSubscriptionStatus);

// Scores (require subscription as per PRD "restrict features")
router.route('/scores')
  .post(protect, subscribedOnly, addScore)
  .get(protect, subscribedOnly, getScores);

export default router;
