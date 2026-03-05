import { Router } from 'express';

import { getAllMembers, getMemberById } from '#controllers/team-controller.js';

const router = Router();

router.get('/team', getAllMembers);
router.get('/team/:id', getMemberById);

export default router;
