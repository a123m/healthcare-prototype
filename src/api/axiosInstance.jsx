// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://healthcare-backed-209511755241.asia-south1.run.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
