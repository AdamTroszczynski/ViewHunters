import { httpClient } from '@/utils/httpClient';
import type Place from '@/types/Place';
import type { HttpResponse } from '@capacitor/core';
import User from '@/types/User';

/** Get single place action
 * @param {number} id PlaceId
 * @param {string} token User's token
 * @returns {Promise<Place>} Place object
 */
export const getSinglePlace = async (
  id: number,
  token: string,
): Promise<Place> => {
  const response: HttpResponse = await httpClient(
    'get',
    'place',
    `places/${id}`,
    { 'x-access-token': token },
  );

  const data = response.data;
  return data;
};

/** Get nearby places action
 * @param {number} geoWidth Geolocation's width
 * @param {number} geoHeight Geolocation's height
 * @param {string} token User's token
 * @returns {Promise<Place[]>} Array of Place objects
 */
export const getNearbyPlaces = async (
  geoWidth: number,
  geoHeight: number,
  token: string,
): Promise<Place[]> => {
  const response: HttpResponse = await httpClient(
    'get',
    'place',
    'places',
    { 'x-access-token': token },
    { geoWidth, geoHeight },
  );

  const data = response.data;
  return data;
};

/** Get explored places action
 * @param {number} userId User's id
 * @param {string} token User's Token
 */
export const getExploredPlaces = async (
  user: User,
  token: string,
): Promise<Place[]> => {
  const userId = user.id;
  const response: HttpResponse = await httpClient(
    'get',
    'place',
    'explored',
    { 'x-access-token': token },
    { userId },
  );

  const data = response.data;
  return data;
};

/** Unlock place action
 * @param {number} placeId PlaceId
 * @param {number} userId UserId
 * @param {string} code Place's code
 * @param {string} token User's token
 */
export const unlockPlace = async (
  placeId: number,
  userId: number,
  code: string,
  token: string,
): Promise<number> => {
  const response: HttpResponse = await httpClient(
    'post',
    'place',
    'places/unlock',
    { 'x-access-token': token },
    {},
    { placeId, userId, code },
  );

  const data = response.data;
  return data;
};
