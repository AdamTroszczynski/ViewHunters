import { Request } from 'express';
import type User from '@/types/User';

/** Request that contains token and basic user info */
export interface TokenRequest extends Request {
  user?: User;
}
