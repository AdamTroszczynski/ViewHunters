import express from 'express';
import { getNearestPlacesAction, getSinglePlaceAction } from '@/controller/placeController';
import { verifyToken } from '@/middleware/auth';

const placeRouter = express.Router();

placeRouter.get('/places', verifyToken, getNearestPlacesAction);

placeRouter.get('/places/:id', verifyToken, getSinglePlaceAction);

export default placeRouter;
