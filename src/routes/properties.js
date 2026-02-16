import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertiesController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', authenticate, createProperty);
router.put('/:id', authenticate, updateProperty);
router.delete('/:id', authenticate, deleteProperty);

export default router;
