import type { Request, Response } from 'express';
import type UserToken from '@/types/common/UserToken';
import type RequestError from '@/types/common/RequestError';
import type { TokenRequest } from '@/interfaces/customRequests';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import bcrypt from 'bcrypt';
import {
  getUserByUsernameBO,
  getUserByIdBO,
  createUserBO,
  getUserByEmailBO,
  getRankingScoresBO,
} from '@/services/userService/userBO';
import { createToken } from '@/utils/helpers/tokenHelpers';

/**
 * Login action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const loginAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res
        .status(StatusCodesEnum.BadRequest)
        .json({ name: ErrorMessagesEnum.ValidationError, errorMsg: 'All inputs are required !' } as RequestError);

      return;
    }

    const user = await getUserByUsernameBO(username);
    if (user && (await bcrypt.compare(password, user?.passwordHash!))) {
      const token = createToken(user);
      user.passwordHash = undefined;
      const resResult: UserToken = { user, token };
      res.status(StatusCodesEnum.OK).json(resResult);
      return;
    }

    res
      .status(StatusCodesEnum.BadRequest)
      .json({ name: ErrorMessagesEnum.ValidationError, errorMsg: 'Wrong username or password !' } as RequestError);
  } catch (err) {
    res
      .status(StatusCodesEnum.ServerError)
      .json({ name: ErrorMessagesEnum.ServerError, errorMsg: err } as RequestError);
  }
};

/**
 * Register action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const registerAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, passwordRepeat } = req.body;

    if (!(username && email && password && passwordRepeat)) {
      res
        .status(StatusCodesEnum.BadRequest)
        .json({ name: ErrorMessagesEnum.ValidationError, errorMsg: 'All inputs are required !' } as RequestError);

      return;
    }

    if (password !== passwordRepeat) {
      res.status(StatusCodesEnum.BadRequest).json({
        name: ErrorMessagesEnum.ValidationError,
        errorMsg: 'Password and repeated password are not the same! ',
      } as RequestError);

      return;
    }

    const oldUserByUsername = await getUserByUsernameBO(username);
    const oldUserByEmail = await getUserByEmailBO(email);

    if (oldUserByUsername || oldUserByEmail) {
      res
        .status(StatusCodesEnum.ResourceConflict)
        .json({ name: ErrorMessagesEnum.ResourceError, errorMsg: 'User already exist. Please Login' } as RequestError);

      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await createUserBO(username, email, hash);
    const user = (await getUserByUsernameBO(username))!;
    const token = createToken(user);
    user.passwordHash = undefined;
    const resResult: UserToken = { user, token };
    res.status(StatusCodesEnum.NewResources).json(resResult);
  } catch (err) {
    res
      .status(StatusCodesEnum.ServerError)
      .json({ name: ErrorMessagesEnum.ServerError, errorMsg: err } as RequestError);
  }
};

/**
 * Get user from token action
 * @param {TokenRequest} req Request
 * @param {Response} res Response
 */
export const getValidUserAction = async (req: TokenRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.user!;
    const user = await getUserByIdBO(id);
    res.status(StatusCodesEnum.OK).json(user);
  } catch (err) {
    res
      .status(StatusCodesEnum.ServerError)
      .json({ name: ErrorMessagesEnum.ServerError, errorMsg: err } as RequestError);
  }
};

/**
 * Get ranking scores action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getRankingScoresAction = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Limit users to for example best 100 users to avoid fetching all users from database
    const scores = await getRankingScoresBO();
    scores.sort((a, b) => b.viewsCount - a.viewsCount);
    res.status(StatusCodesEnum.OK).json(scores);
  } catch (err) {
    res
      .status(StatusCodesEnum.ServerError)
      .json({ name: ErrorMessagesEnum.ServerError, errorMsg: err } as RequestError);
  }
};
