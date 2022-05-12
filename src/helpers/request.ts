import axios from 'axios';
import { refreshToken } from './m';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem('token')!);
    config.headers = {
      'Content-Type': 'application/json',
      accesstoken: token.access_token,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.common['accesstoken'] = `${access_token}`;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
