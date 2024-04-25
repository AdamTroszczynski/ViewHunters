import express from 'express';
import { getNearestPlacesAction } from '@/controller/placeController';

const placeRouter = express.Router();

placeRouter.get('/places', getNearestPlacesAction);

export default placeRouter;
