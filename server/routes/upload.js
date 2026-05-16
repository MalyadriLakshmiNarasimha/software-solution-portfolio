import { Router } from 'express';
import { uploadImage } from '../middleware/upload.js';
import { uploadImageHandler } from '../controllers/uploadController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/image', verifyToken, uploadImage.single('image'), uploadImageHandler);

export default router;
