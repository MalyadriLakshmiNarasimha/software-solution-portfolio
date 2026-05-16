import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', getProjects);
router.get('/admin/all', verifyToken, getAllProjectsAdmin);
router.get('/:slug', getProjectBySlug);
router.post(
  '/',
  verifyToken,
  [body('title').notEmpty(), body('category').notEmpty(), body('client').notEmpty()],
  createProject
);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;
