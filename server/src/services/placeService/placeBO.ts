import type Place from '@/types/Place';
import { getNearestPlacesDAO } from '@/services/placeService/placeDAO';

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
