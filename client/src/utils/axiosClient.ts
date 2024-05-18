import { BASE_SERVER_URL } from '@/const/commonConst';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${BASE_SERVER_URL}/api`,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosClient;
