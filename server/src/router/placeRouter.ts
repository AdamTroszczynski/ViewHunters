import express from 'express';
import { getNearestPlacesAction, getSinglePlaceAction } from '@/controller/placeController';
import { verifyToken } from '@/middleware/auth';
import { validRequest } from '@/middleware/validators/commonValidators';
import { getNearestPlacesValidators, getSinglePlaceValidators } from '@/middleware/validators/placeValidators';

const placeRouter = express.Router();

placeRouter.get('/places', [verifyToken, ...getNearestPlacesValidators, validRequest], getNearestPlacesAction);

placeRouter.get('/places/:id', [verifyToken, ...getSinglePlaceValidators, validRequest], getSinglePlaceAction);

export default placeRouter;
