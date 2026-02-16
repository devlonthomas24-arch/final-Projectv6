import express from 'express';
import {
  getHosts,
  getHost,
  createHost,
  updateHost,
  deleteHost
} from '../controllers/hostsController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHosts);
router.get('/:id', getHost);
router.post('/', authenticate, createHost);
router.put('/:id', authenticate, updateHost);
router.delete('/:id', authenticate, deleteHost);

export default router;
