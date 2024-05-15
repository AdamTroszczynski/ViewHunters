import type { Request, Response } from 'express';
import type Place from '@/types/Place';
import type RequestError from '@/types/common/RequestError';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import dbClient from '@/services/dbClient';
import {
  getNearestPlacesBO,
  getSinglePlaceBO,
  getExploredPlacesBO,
  unlockPlaceBO,
  isPlaceUnlockedBO,
} from '@/services/placeService/placeBO';

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

export const getExploredPlacesAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const places: Place[] = await getExploredPlacesBO(Number(userId));
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

/**
 * Unlock place action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const unlockPlaceAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { placeId, userId, code } = req.body;
    if (await isPlaceUnlockedBO(Number(placeId), Number(userId))) {
      res
        .status(StatusCodesEnum.UnprocessableEntity)
        .json({ name: ErrorMessagesEnum.ResourceError, errorMsg: 'Place is already unlocked !' } as RequestError);

      return;
    }

    const unlocked = await unlockPlaceBO(Number(placeId), Number(userId), code);

    if (unlocked) {
      res.status(StatusCodesEnum.OK).json(unlocked);
    } else {
      res
        .status(StatusCodesEnum.UnprocessableEntity)
        .json({ name: ErrorMessagesEnum.ResourceError, errorMsg: 'Invalid code value !' } as RequestError);
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};
