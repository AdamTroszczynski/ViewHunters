import express from 'express';
import { loginAction, registerAction, getValidUserAction } from '@/controller/userController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import { loginValidators, registerValidators } from '@/middleware/validators/userValidators';

const authRouter = express.Router();

authRouter.get('/check', verifyToken, getValidUserAction);

authRouter.post('/login', [...loginValidators, validRequest], loginAction);

authRouter.post('/register', [...registerValidators, validRequest], registerAction);

export default authRouter;
