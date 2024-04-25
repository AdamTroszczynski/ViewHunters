import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { BASE_CLIENT_URL, PREVIEW_CLIENT_URL, PLACE_API_PATH } from '@/const/commonConst';
import placeRouter from '@/router/placeRouter';

/** Create and prepare app object */
export const createApp = (): Express => {
  const app: Express = express();

  // Modules setup
  app.use(json());
  app.use(helmet());
  app.use(cors({ origin: [BASE_CLIENT_URL, PREVIEW_CLIENT_URL] }));

  // Routes setup
  app.use(PLACE_API_PATH, placeRouter);

  return app;
};

export default createApp();
