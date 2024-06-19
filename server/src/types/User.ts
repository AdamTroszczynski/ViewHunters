type User = {
  id: number;
  username: string;
  email: string;
  passwordHash?: string;
  viewsCount: number;
};

export default User;
