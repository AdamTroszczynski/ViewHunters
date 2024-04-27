import axios from "axios";
import axiosClient from "@/utils/axiosClient";
import { type UserToken } from "@/types/commonTypes";

export const login = async (username: string, password: string): Promise<UserToken> => {
  try {
    const response = await axiosClient.post('/login', {username, password});
    const data = response.data;
    return {user: data.user, token: data.token};
  } catch (error) {
    throw new Error('Login service error');
  };
};

export const register = async (username: string, email: string, password: string, passwordRepeat: string): Promise<UserToken> => {
  try {
    const response = await axiosClient.post('register', {username, email, password, passwordRepeat});
    const data = response.data;
    return {user: data.user, token: data.token};
  } catch (error) {
    throw new Error('Register service error');
  };
};
