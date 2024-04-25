import type { Request, Response } from 'express';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import type Place from '@/types/Place';
import dbClient from '@/services/dbClient';
import { getNearestPlacesBO, getSinglePlaceBO } from '@/services/placeService/placeBO';

/**
 * Get nearest places action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getNearestPlacesAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { geoWidth, geoHeight } = req.query;
    const places: Place[] = await getNearestPlacesBO(Number(geoWidth), Number(geoHeight));
    res.status(StatusCodesEnum.OK).json(places);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};

/**
 * Get single place action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getSinglePlaceAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const place: Place | null = await getSinglePlaceBO(Number(id));
    res.status(StatusCodesEnum.OK).json(place);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};
