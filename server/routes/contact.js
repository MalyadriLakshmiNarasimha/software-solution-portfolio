import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getInquiries,
  markAsRead,
  deleteInquiry,
} from '../controllers/contactController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadAttachment } from '../middleware/upload.js';

const router = Router();

router.post(
  '/',
  uploadAttachment.single('attachment'),
  [
    body('name').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').notEmpty().trim(),
  ],
  submitContact
);

router.get('/', verifyToken, getInquiries);
router.put('/:id/read', verifyToken, markAsRead);
router.delete('/:id', verifyToken, deleteInquiry);

export default router;
