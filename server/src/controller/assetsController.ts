import type { Request, Response } from 'express';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import path from 'path';
import { existsSync } from 'fs';
import { BASE_CLIENT_URL } from '@/const/commonConst';
import type RequestError from '@/types/common/RequestError';

export const getImageAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, imageName } = req.params;
    const imagePath = path.join(__dirname, '../www/accounts', String(userId), String(imageName));
    console.log(imagePath);

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
