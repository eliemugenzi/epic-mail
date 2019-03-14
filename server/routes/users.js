import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();

router.get('/', UserController.users);
router.get('/:id', UserController.singleUser);

export default router;
