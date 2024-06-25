import User from '@/types/User';
import dbClient from '@/services/dbClient';
import type RankingScore from '@/types/common/RankingScore';
import type UnlockedAchievement from '@/types/UnlockedAchievement';
import type Achievement from '@/types/Achievement';
import type { Prisma } from '@prisma/client';

/**
 * Get user by username DAO
 * @param {string} username username
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByUsernameDAO = async (username: string): Promise<User | null> => {
  return (await dbClient.user.findFirst({ where: { username: username } })) as User | null;
};

/**
 * Get user by id DAO
 * @param {number} id id
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByIdDAO = async (id: number): Promise<User | null> => {
  return (await dbClient.user.findFirst({
    where: { id: id },
    select: { id: true, username: true, email: true, viewsCount: true },
  })) as User | null;
};

/**
 * Get user by email DAO
 * @param {string} email email to find
 * @returns {Promise<User | null>} user object or null if user is not found
 */
export const getUserByEmailDAO = async (email: string): Promise<User | null> => {
  return (await dbClient.user.findFirst({
    where: { email: email },
    select: { id: true, username: true, email: true },
  })) as User | null;
};

/**
 * Create new user BO
 * @param {string} username username
 * @param {string} email email address
 * @param {string} passwordHash encoded password
 * @returns {Promise<User>} created user object
 */
export const createUserDAO = async (username: string, email: string, passwordHash: string): Promise<User> => {
  return await dbClient.user.create({
    data: { username: username, email: email, passwordHash: passwordHash, viewsCount: 0 },
  });
};

/**
 * Get all ranking scores DAO
 * @returns {Promise<RankingScore>} ranking scores
 */
export const getRankingScoresDAO = async (): Promise<RankingScore[]> => {
  return await dbClient.user.findMany({
    select: { username: true, viewsCount: true },
    orderBy: { viewsCount: 'desc' },
    take: 100,
  });
};

/**
 * Increment views count value for specific user
 * @param {number} userId user id
 * @returns {Promise<User>} user object
 */
export const updateUserViewsCountDAO = async (userId: number): Promise<User> => {
  return await dbClient.user.update({
    where: { id: userId },
    data: { viewsCount: { increment: 1 } },
  });
};

/**
 * Get possible achievements to unlock DAO
 * @param {number} userViewsCount amount of places unlocked by user
 * @returns {Promise<Achievement[]>} array of possible achievements to unlock
 */
export const getPossibleAchievementsToUnlockDAO = async (userViewsCount: number): Promise<Achievement[]> => {
  return await dbClient.achievement.findMany({
    where: {
      value: { lte: userViewsCount },
    },
  });
};

/**
 * Get user achievements DAO
 * @param {number} userId user id
 * @returns {Promise<Achievement[]>} all unlocked achievements by user
 */
export const getUserAchievementsDAO = async (userId: number): Promise<Achievement[]> => {
  return await dbClient.achievement.findMany({
    where: {
      unlockedAchievements: {
        some: {
          userId: userId,
        },
      },
    },
  });
};

/**
 * Unlock achievements DAO
 * @param {UnlockedAchievement[]} achievementsToUnlock array of prepared achievements objects to insert to database
 * @returns {Promise<Prisma.BatchPayload>} unlocked achievements prepared objects
 */
export const unlockAchievementsDAO = async (
  achievementsToUnlock: UnlockedAchievement[],
): Promise<Prisma.BatchPayload> => {
  return await dbClient.unlockedAchievement.createMany({
    data: achievementsToUnlock,
    skipDuplicates: true,
  });
};
