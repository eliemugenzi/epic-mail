import { Router } from 'express';
const router = Router();
import AuthController from '../controllers/auth';
import { userValidate } from '../middleware/validations';

router.post('/login', AuthController.login);
router.post('/signup', userValidate, AuthController.register);

export default router;
