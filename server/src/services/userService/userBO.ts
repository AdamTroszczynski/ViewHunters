import User from '@/types/User';
import {
  getUserByUsernameDAO,
  getUserByIdDAO,
  getUserByEmailDAO,
  getRankingScoresDAO,
  getUserAchievementsDAO,
  getPossibleAchievementsToUnlockDAO,
  createUserDAO,
  updateUserViewsCountDAO,
  unlockAchievementsDAO,
} from '@/services/userService/userDAO';
import type RankingScore from '@/types/common/RankingScore';
import type UnlockedAchievement from '@/types/UnlockedAchievement';
import type { IUnlockedAchievementsMap } from '@/interfaces/common';
import type { Prisma } from '@prisma/client';
import type Achievement from '@/types/Achievement';

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

/**
 * Get achievements to unlock BO
 * @param {IUnlockedAchievementsMap} userAchievements map of all user achievements
 * @param {number} userViewsCount amount of unlocked places by user
 * @param {number} userId user id
 * @returns {Promise<UnlockedAchievement[]>} array of prepared achievements objects to unlock
 */
export const getAchievementsToUnlockBO = async (
  userAchievements: IUnlockedAchievementsMap,
  userViewsCount: number,
  userId: number,
): Promise<UnlockedAchievement[]> => {
  const possibleAchievementsToUnlock = await getPossibleAchievementsToUnlockDAO(userViewsCount);
  const filteredAchievementsToUnlock = possibleAchievementsToUnlock.filter((el) => !userAchievements[el.id]);
  return filteredAchievementsToUnlock.map((el) => ({ userId: userId, achievementId: el.id }));
};

/**
 * Get user achievements BO
 * @param {number} userId user id
 * @returns {Promise<Achievement[]>} all unlocked achievements by user
 */
export const getUserAchievementsBO = async (userId: number): Promise<Achievement[]> => {
  return getUserAchievementsDAO(userId);
};

/**
 * Unlock achievements BO
 * @param {number} userId user id
 * @param {number} userViewsCount amount of unlocked places by user
 * @returns {Promise<Prisma.BatchPayload | null>} unlocked achievements
 */
export const unlockAchievementsBO = async (
  userId: number,
  userViewsCount: number,
): Promise<Prisma.BatchPayload | null> => {
  const userAchievements: IUnlockedAchievementsMap = (await getUserAchievementsDAO(userId)).reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const achievementsToUnlock = await getAchievementsToUnlockBO(userAchievements, userViewsCount, userId);
  let result: Prisma.BatchPayload | null = null;
  if (achievementsToUnlock.length > 0) {
    result = await unlockAchievementsDAO(achievementsToUnlock);
  }

  return result;
};
