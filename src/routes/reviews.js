import express from 'express';
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewsController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', authenticate, createReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;
