import type Place from '@/types/Place';
import dbClient from '@/services/dbClient';

/**
 * Get nearest places DAO
 * @returns {Place[]} Array of places
 */
export const getNearestPlacesDAO = async (): Promise<Place[]> => {
  return await dbClient.places.findMany();
};
