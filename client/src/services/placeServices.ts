import {
  CapacitorHttp,
  type HttpOptions,
  type HttpResponse,
} from '@capacitor/core';
import type Place from '@/types/Place';
import User from '@/types/User';
import { BASE_SERVER_URL } from '@/const/commonConst';

/** Get single place action
 * @param {number} id PlaceId
 * @param {string} token User's token
 * @returns {Promise<Place>} Place object
 */
export const getSinglePlace = async (
  id: number,
  token: string,
): Promise<Place> => {
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/place/places/${id}`,
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  };

  const response = await CapacitorHttp.get(options);
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
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/place/places?geoWidth=${geoWidth}&geoHeight=${geoHeight}`,
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);
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
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/place/explored?userId=${userId}`,
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);
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
  const options: HttpOptions = {
    url: `${BASE_SERVER_URL}/api/place/places/unlock`,
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
    data: { placeId, userId, code },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);
  const data = response.data;
  return data;
};
