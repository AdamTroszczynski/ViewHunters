import type Place from '@/types/Place';
import {
  getNearestPlacesDAO,
  getExploredPlacesDAO,
  getPlaceCodeDAO,
  getSinglePlaceDAO,
  getUnlockedDAO,
  unlockPlaceDAO,
} from '@/services/placeService/placeDAO';
import { toRadians } from '@/utils/helpers/mathHelpers';

/**
 * Get nearest places BO, only places that are near the user's location
 * @param {number} geoWidth geolocation width
 * @param {number} geoHeight geolocation height
 * @returns {Place[]} Array of nearest places (to 15km distance)
 */
export const getNearestPlacesBO = async (geoWidth: number, geoHeight: number): Promise<Place[]> => {
  const places = await getNearestPlacesDAO();
  const R = 6371;

  const filteredPlaces = places.filter((place: Place) => {
    const lat1 = toRadians(place.geoWidth);
    const lon1 = toRadians(place.geoHeight);
    const lat2 = toRadians(geoWidth);
    const lon2 = toRadians(geoHeight);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = R * c;
    return distance <= 15;
  });

  // Convert images string into array of images string paths
  filteredPlaces.forEach((place: Place) => {
    place.photo = (place.photo as string).split(',');
  });

  return filteredPlaces;
};

/**
 * Get single place BO
 * @param {number} id place id
 * @returns {Place} single place object
 */
export const getSinglePlaceBO = async (id: number): Promise<Place | null> => {
  const place = await getSinglePlaceDAO(id);
  if (place) {
    place.photo = (place.photo as string).split(',');
  }

  return place;
};

/**
 * Get all explored places by user BO
 * @param userId user id
 * @returns {Promise<Place[]>}
 */
export const getExploredPlacesBO = async (userId: number): Promise<Place[]> => {
  return await getExploredPlacesDAO(userId);
};

/**
 * Is place unlocked BO
 * @param {number} placeId place id
 * @param {number} userId user id
 * @returns {Promise<boolean>}
 */
export const isPlaceUnlockedBO = async (placeId: number, userId: number): Promise<boolean> => {
  return !!(await getUnlockedDAO(userId, placeId));
};

/**
 * Unlock place for user BO
 * @param {number} placeId place id
 * @param {number} userId user id
 * @param {string} codeToCheck code to compare with correct place code
 * @returns {Promise<number | null>} Unlocked place id
 */
export const unlockPlaceBO = async (placeId: number, userId: number, codeToCheck: string): Promise<number | null> => {
  if ((await getPlaceCodeDAO(placeId)) !== codeToCheck) return null;
  return await unlockPlaceDAO(userId, placeId);
};
