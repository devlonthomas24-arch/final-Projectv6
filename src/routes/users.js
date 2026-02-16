import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/usersController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', authenticate, createUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
