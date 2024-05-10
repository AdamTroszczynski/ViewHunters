import type Place from '@/types/Place';
import {
  getNearestPlacesDAO,
  getPlaceCodeDAO,
  getSinglePlaceDAO,
  getUnlockedDAO,
  unlockPlaceDAO,
} from '@/services/placeService/placeDAO';

/**
 * Get nearest places BO, only places that are near the user's location
 * @param {number} geoWidth geolocation width
 * @param {number} geoHeight geolocation height
 * @returns {Place[]} Array of nearest places (to 15km distance)
 */
export const getNearestPlacesBO = async (geoWidth: number, geoHeight: number): Promise<Place[]> => {
  const places = await getNearestPlacesDAO();
  const filteredPlaces = places.filter((place: Place) => {
    const x1 = place.geoWidth;
    const y1 = place.geoHeight;
    const x2 = geoWidth;
    const y2 = geoHeight;
    const distance: number = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
