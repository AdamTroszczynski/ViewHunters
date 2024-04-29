import type { Response, NextFunction } from 'express';
import type RequestError from '@/types/common/RequestError';
import type User from '@/types/User';
import type { TokenRequest } from '@/interfaces/customRequests';
import jwt from 'jsonwebtoken';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';

/**
 * Middleware to verify jwt token from user
 * @param {TokenRequest} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function
 */
export const verifyToken = (req: TokenRequest, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    const requestError: RequestError = {
      name: ErrorMessagesEnum.ResourceError,
      errorMsg: 'Token is required for authentication !',
    };

    return res.status(StatusCodesEnum.ResourceForbidden).json(requestError);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY ?? 'abcd1234');
    req.user = decoded as User;
  } catch (err) {
    const requestError: RequestError = {
      name: ErrorMessagesEnum.ResourceError,
      errorMsg: 'Invalid Token',
    };

    return res.status(StatusCodesEnum.Unauthorized).json(requestError);
  }

  return next();
};
