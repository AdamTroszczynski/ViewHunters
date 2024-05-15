import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import {
  BASE_CLIENT_URL,
  PREVIEW_CLIENT_URL,
  PLACE_API_PATH,
  AUTH_API_PATH,
  ASSETS_API_PATH,
} from '@/const/commonConst';
import placeRouter from '@/router/placeRouter';
import userRouter from '@/router/userRouter';
import assetRouter from '@/router/assetRouter';

/** Create and prepare app object */
export const createApp = (): Express => {
  const app: Express = express();

  // Modules setup
  app.use(json());
  app.use(helmet());
  app.use(cors({ origin: [BASE_CLIENT_URL, PREVIEW_CLIENT_URL] }));

  // Routes setup
  app.use(PLACE_API_PATH, placeRouter);
  app.use(AUTH_API_PATH, userRouter);
  app.use(ASSETS_API_PATH, assetRouter);

  return app;
};

export default createApp();
