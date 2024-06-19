import User from '@/types/User';
import {
  getUserByUsernameDAO,
  getUserByIdDAO,
  getUserByEmailDAO,
  createUserDAO,
  getRankingScoresDAO,
  updateUserViewsCountDAO,
} from '@/services/userService/userDAO';
import type RankingScore from '@/types/common/RankingScore';

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
 * Get user by email BO
 * @param {string} email email to find
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByEmailBO = async (email: string): Promise<User | null> => {
  return await getUserByEmailDAO(email);
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

/**
 * Get ranking scores BO
 * @returns {Promise<RankingScore[]>} all ranking scores
 */
export const getRankingScoresBO = async (): Promise<RankingScore[]> => {
  return await getRankingScoresDAO();
};

/**
 * Update user views count value BO
 * @param {number} userId user id
 * @returns {Promise<number>} updated value
 */
export const updateUserViewsCountBO = async (userId: number): Promise<number> => {
  const result = await updateUserViewsCountDAO(userId);
  return result.viewsCount;
};
