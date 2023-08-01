import axios, { AxiosError } from 'axios';

const accessToken: string | null = localStorage.getItem('access_token');

const axiosParams = {
  baseURL: process.env.BASE_URL,
  headers: <{
    'Content-Type': string,
    'Accept': string,
    'mode': string,
    'Authorization'?: string
  }> {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'mode': 'no-cors'
  }
}

if (accessToken) axiosParams.headers['Authorization'] = accessToken;

const api = axios.create(axiosParams);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;