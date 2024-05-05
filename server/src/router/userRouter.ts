import express from 'express';
import { loginAction, registerAction, getValidUserAction } from '@/controller/userController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import { loginValidators, registerValidators } from '@/middleware/validators/userValidators';

const userRouter = express.Router();

userRouter.get('/check', verifyToken, getValidUserAction);

userRouter.post('/login', [...loginValidators, validRequest], loginAction);

userRouter.post('/register', [...registerValidators, validRequest], registerAction);

export default userRouter;
