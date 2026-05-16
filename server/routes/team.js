import { Router } from 'express';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', getTeam);
router.post('/', verifyToken, createTeamMember);
router.put('/:id', verifyToken, updateTeamMember);
router.delete('/:id', verifyToken, deleteTeamMember);

export default router;
