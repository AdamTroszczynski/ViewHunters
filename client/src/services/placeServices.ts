import axios from 'axios';
import axiosClient from '@/utils/axiosClient';
import type Place from '@/types/Place';

/** Get single place action
 * @param {number} id PlaceId
 * @param {string} token User's session token
 * @returns {Promise<Place>} Place object
 */
export const getSinglePlace = async (
  id: number,
  token: string,
): Promise<Place> => {
  const response = await axiosClient.get(`/place/places/${id}`, {
    headers: { 'x-access-token': token },
  });
  const data = response.data;
  return data;
};

/** Get nearby places action
 * @param {number} geoWidth Geolocation's width
 * @param {number} geoHeight Geolocation's height
 * @returns {Promise<Place[]>} Array of Place objects
 */
export const getNearbyPlaces = async (
  geoWidth: number,
  geoHeight: number,
  token: string,
): Promise<Place[]> => {
  const response = await axiosClient.get(
    `/place/places?geoWidth=${geoWidth}&geoHeight=${geoHeight}`,
    { headers: { 'x-access-token': token } },
  );
  const data = response.data;
  return data;
};

/** Unlock place action
 * @param {number} placeId PlaceId
 * @param {number} userId UserId
 * @param {string} code Place's code
 * @param {string} token User's session token
 */
export const unlockPlace = async (
  placeId: number,
  userId: number,
  code: string,
  token: string,
): Promise<number> => {
  const response = await axiosClient.post(
    '/place/places/unlock',
    {
      placeId,
      userId,
      code,
    },
    { headers: { 'x-access-token': token } },
  );
  const data = response.data;
  return data;
};
