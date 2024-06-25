import express from 'express';
import { getRankingScoresAction, getUserAchievementsAction } from '@/controller/userController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import { getUserAchievementsValidators } from '@/middleware/validators/userValidators';

const userRouter = express.Router();

userRouter.get('/score', verifyToken, getRankingScoresAction);

userRouter.get(
  '/achievements',
  [verifyToken, ...getUserAchievementsValidators, validRequest],
  getUserAchievementsAction,
);

export default userRouter;
