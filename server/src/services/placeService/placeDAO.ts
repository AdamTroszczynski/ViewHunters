import type Place from '@/types/Place';
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
