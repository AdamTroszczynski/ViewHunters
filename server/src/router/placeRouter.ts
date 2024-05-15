import express from 'express';
import {
  getNearestPlacesAction,
  getExploredPlacesAction,
  getSinglePlaceAction,
  unlockPlaceAction,
} from '@/controller/placeController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import {
  getNearestPlacesValidators,
  getSinglePlaceValidators,
  getExploredPlacesValidators,
  unlockPlaceValidators,
} from '@/middleware/validators/placeValidators';

const placeRouter = express.Router();

placeRouter.get('/places', [verifyToken, ...getNearestPlacesValidators, validRequest], getNearestPlacesAction);

placeRouter.get('/places/:id', [verifyToken, ...getSinglePlaceValidators, validRequest], getSinglePlaceAction);

placeRouter.get('/explored', [verifyToken, ...getExploredPlacesValidators, validRequest], getExploredPlacesAction);

placeRouter.post('/places/unlock', [verifyToken, ...unlockPlaceValidators, validRequest], unlockPlaceAction);

export default placeRouter;
