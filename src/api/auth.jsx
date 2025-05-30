// src/api/auth.js
import axiosInstance from './axiosInstance';

export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login/', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // You can customize error handling here
    throw error.response ? error.response.data : error;
  }
};
