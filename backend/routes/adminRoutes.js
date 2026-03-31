import express from 'express';
import { getUsers, getAdminReports } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, getUsers);
router.get('/reports', protect, adminOnly, getAdminReports);

export default router;
