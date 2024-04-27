import { type User } from "@/types/User";

export type LoginForm = {
  username: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export type UserToken = {
  user: User;
  token: string;
};
