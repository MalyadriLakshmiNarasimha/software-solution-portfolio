import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', getBlogPosts);
router.get('/admin/all', verifyToken, getAllBlogPostsAdmin);
router.get('/:slug', getBlogPostBySlug);
router.post('/', verifyToken, createBlogPost);
router.put('/:id', verifyToken, updateBlogPost);
router.delete('/:id', verifyToken, deleteBlogPost);

export default router;
