import { httpClient } from '@/utils/httpClient';
import { type HttpResponse } from '@capacitor/core';
import { type UserToken } from '@/types/commonTypes';
import User from '@/types/User';

/** Login action
 * @param {string} username Username
 * @param {string} password Password
 * @returns {Promise<UserToken>} UserToken object
 */
export const login = async (
  username: string,
  password: string,
): Promise<UserToken> => {
  const response: HttpResponse = await httpClient(
    'post',
    'auth',
    'login',
    {},
    {},
    { username, password },
  );

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
  const response: HttpResponse = await httpClient(
    'post',
    'auth',
    'register',
    {},
    {},
    { username, email, password, passwordRepeat },
  );

  const data = response.data;
  return { user: data.user, token: data.token };
};

/** Check token action
 * @param {string} token User's token
 * @returns {Promise<User>} User object
 */
export const checkToken = async (token: string): Promise<User> => {
  const response: HttpResponse = await httpClient('get', 'auth', 'check', {
    'x-access-token': token,
  });

  const data = response.data;
  return data;
};
