import express from 'express';
import { getImageAction } from '@/controller/assetsController';
import { verifyToken } from '@/middleware/auth';
import { getImageValidators } from '@/middleware/validators/assetValidators';
import { validRequest } from '@/middleware/validators/commonValidators';

const assetRouter = express.Router();

assetRouter.get('/image/:placeId/:imageName', [verifyToken, ...getImageValidators, validRequest], getImageAction);

export default assetRouter;
