import type Place from '@/types/Place';
import type UnlockedPlace from '@/types/UnlockedPlace';
import dbClient from '@/services/dbClient';

/**
 * Get nearest places DAO
 * @returns {Place[]} Array of places
 */
export const getNearestPlacesDAO = async (): Promise<Place[]> => {
  return await dbClient.place.findMany({
    select: { id: true, name: true, geoWidth: true, geoHeight: true, photo: true, category: true, description: true },
  });
};

/**
 * Get all explored places by user DAO
 * @param userId user id
 * @returns {Promise<Place[]>}
 */
export const getExploredPlacesDAO = async (userId: number): Promise<Place[]> => {
  return await dbClient.place.findMany({
    where: {
      unlocked: {
        some: {
          userId: userId,
        },
      },
    },
  });
};

/**
 * Get single place DAO
 * @param {number} id ID of the place
 * @returns {Place} place object
 */
export const getSinglePlaceDAO = async (id: number): Promise<Place | null> => {
  return await dbClient.place.findFirst({
    where: { id: id },
    select: { id: true, name: true, geoWidth: true, geoHeight: true, photo: true, category: true, description: true },
  });
};

/**
 * Get place code DAO
 * @param {number} id place id
 * @returns {Promise<string | null>}
 */
export const getPlaceCodeDAO = async (id: number): Promise<string | null> => {
  const place = await dbClient.place.findFirst({ where: { id: id }, select: { code: true } });
  if (place) {
    return place.code;
  }

  return null;
};

/**
 * Unlock new place DAO (Create new unlocked place record)
 * @param {number} userId user id
 * @param {number} placeId place id
 * @returns {Promise<number>} unlocked place id
 */
export const unlockPlaceDAO = async (userId: number, placeId: number): Promise<number> => {
  const result = await dbClient.unlockedPlace.create({ data: { userId: userId, placeId: placeId } });
  return result.placeId;
};

/**
 * Get unlocked record DAO
 * @param {number} userId user id
 * @param {number} placeId place id
 * @returns {Promise<UnlockedPlace | null>}
 */
export const getUnlockedDAO = async (userId: number, placeId: number): Promise<UnlockedPlace | null> => {
  return await dbClient.unlockedPlace.findFirst({ where: { userId: userId, placeId: placeId } });
};
