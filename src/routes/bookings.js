import express from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingsController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBookings);
router.get('/:id', getBooking);
router.post('/', authenticate, createBooking);
router.put('/:id', authenticate, updateBooking);
router.delete('/:id', authenticate, deleteBooking);

export default router;
