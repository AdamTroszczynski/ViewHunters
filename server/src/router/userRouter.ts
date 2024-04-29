import express from 'express';
import { loginAction, registerAction, getValidUserAction } from '@/controller/userController';
import { verifyToken } from '@/middleware/auth';

const userRouter = express.Router();

userRouter.get('/check', verifyToken, getValidUserAction);

userRouter.post('/login', loginAction);

userRouter.post('/register', registerAction);

export default userRouter;
