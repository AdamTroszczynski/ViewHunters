import express from 'express';
import { getNearestPlacesAction, getSinglePlaceAction, unlockPlaceAction } from '@/controller/placeController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import {
  getNearestPlacesValidators,
  getSinglePlaceValidators,
  getUnlockPlaceValidators,
} from '@/middleware/validators/placeValidators';

const placeRouter = express.Router();

placeRouter.get('/places', [verifyToken, ...getNearestPlacesValidators, validRequest], getNearestPlacesAction);

placeRouter.get('/places/:id', [verifyToken, ...getSinglePlaceValidators, validRequest], getSinglePlaceAction);

placeRouter.post('/places/unlock', [verifyToken, ...getUnlockPlaceValidators, validRequest], unlockPlaceAction);

export default placeRouter;
