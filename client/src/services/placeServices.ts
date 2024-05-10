import axios from 'axios';
import axiosClient from '@/utils/axiosClient';
import { type Place } from '@/types/Place';

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

export const getPlaces = async (
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
