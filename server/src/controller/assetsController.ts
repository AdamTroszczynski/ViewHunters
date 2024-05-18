import type { Request, Response } from 'express';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import path from 'path';
import { existsSync } from 'fs';
import { BASE_CLIENT_URL } from '@/const/commonConst';
import type RequestError from '@/types/common/RequestError';

/**
 * Get image action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getImageAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { placeId, imageName } = req.params;
    const imagePath = path.join(__dirname, '../www/places', String(placeId), String(imageName));

    res.set('Access-Control-Allow-Origin', BASE_CLIENT_URL);
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');

    if (existsSync(imagePath)) {
      res.status(StatusCodesEnum.OK).sendFile(imagePath);
    } else {
      res
        .status(StatusCodesEnum.NotFound)
        .send({ name: ErrorMessagesEnum.ResourceError, errorMsg: 'Image not found !' } as RequestError);
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  }
};
