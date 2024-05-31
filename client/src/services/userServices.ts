import {
  CapacitorHttp,
  type HttpOptions,
  type HttpResponse,
} from '@capacitor/core';
import { type UserToken } from '@/types/commonTypes';
import User from '@/types/User';
import { BASE_SERVER_URL } from '@/const/commonConst';

/** Login action
 * @param {string} username Username
 * @param {string} password Password
 * @returns {Promise<UserToken>} UserToken object
 */
export const login = async (
  username: string,
  password: string,
): Promise<UserToken> => {
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/auth/login`,
    headers: { 'Content-type': 'application/json' },
    data: { username, password },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);
  const data = response.data;
  return { user: data.user, token: data.token };
};

/** Register action
 * @param {string} username Username
 * @param {string} email Email
 * @param {string} password Password
 * @param {string} passwordRepeat Password repeat
 * @returns {Promise<UserToken>} UserToken object
 */
export const register = async (
  username: string,
  email: string,
  password: string,
  passwordRepeat: string,
): Promise<UserToken> => {
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/auth/register`,
    headers: { 'Content-Type': 'application/json' },
    data: { username, email, password, passwordRepeat },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);
  const data = response.data;
  return { user: data.user, token: data.token };
};

/** Check token action
 * @param {string} token User's token
 * @returns {Promise<User>} User object
 */
export const checkToken = async (token: string): Promise<User> => {
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/auth/check`,
    headers: { 'x-access-token': token },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);
  const data = response.data;
  return data;
};
