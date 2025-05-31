// src/api/axiosInstance.js
import axios from 'axios';
import { store } from '../store/authSlice';

const baseURL = 'http://192.168.161.23:8000/api/v1'; //use credentials as admin: admin

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // first try Redux
    const token =
      store.getState().auth.token ||
      // fallback to localStorage
      localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
