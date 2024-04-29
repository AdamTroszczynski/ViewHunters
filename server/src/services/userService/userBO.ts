import User from '@/types/User';
import { getUserByUsernameDAO, getUserByIdDAO, createUserDAO } from '@/services/userService/userDAO';

/**
 * Get user by username BO
 * @param {string} username username
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByUsernameBO = async (username: string): Promise<User | null> => {
  return await getUserByUsernameDAO(username);
};

/**
 * Get user by id BO
 * @param {number} id id
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByIdBO = async (id: number): Promise<User | null> => {
  return await getUserByIdDAO(id);
};

/**
 * Create new user BO
 * @param {string} username username
 * @param {string} email email address
 * @param {string} passwordHash encoded password
 * @returns {Promise<User>} created user object
 */
export const createUserBO = async (username: string, email: string, passwordHash: string): Promise<User> => {
  return await createUserDAO(username, email, passwordHash);
};
