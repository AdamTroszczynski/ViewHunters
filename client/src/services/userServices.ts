import axios from 'axios';
import axiosClient from '@/utils/axiosClient';
import type { AxiosError } from 'axios';
import { type UserToken } from '@/types/commonTypes';

export const login = async (
  username: string,
  password: string,
): Promise<UserToken> => {
  const response = await axiosClient.post('/auth/login', {
    username,
    password,
  });
  const data = response.data;
  return { user: data.user, token: data.token };
};

export const register = async (
  username: string,
  email: string,
  password: string,
  passwordRepeat: string,
): Promise<UserToken> => {
  const response = await axiosClient.post('/auth/register', {
    username,
    email,
    password,
    passwordRepeat,
  });
  const data = response.data;
  return { user: data.user, token: data.token };
};
