import express from 'express';
import { getNearestPlacesAction, getSinglePlaceAction } from '@/controller/placeController';

const placeRouter = express.Router();

placeRouter.get('/places', getNearestPlacesAction);

placeRouter.get('/places/:id', getSinglePlaceAction);

export default placeRouter;
