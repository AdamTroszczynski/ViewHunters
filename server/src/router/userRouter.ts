import express from 'express';
import { getRankingScoresAction } from '@/controller/userController';
import { verifyToken } from '@/middleware/auth';

const userRouter = express.Router();

userRouter.get('/score', verifyToken, getRankingScoresAction);

export default userRouter;
