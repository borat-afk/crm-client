import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const accessToken: string | null = localStorage.getItem('access_token');

const axiosParams = {
  baseURL: import.meta.env.VITE_BASE_URL,
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
    toast.error(error.message)
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;