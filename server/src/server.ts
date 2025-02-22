import http from 'http';
import app from '@/app';
import { loadEnv } from '@/utils/envLoader/envLoader';
import { BASE_URL } from '@/const/commonConst';

loadEnv();

const port = process.env.PORT ?? 3000;

http.createServer(app).listen(port, (): void => {
  console.log(`Server is running at ${BASE_URL}:${port}`);
});
