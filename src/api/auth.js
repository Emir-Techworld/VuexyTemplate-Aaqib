import api from "./axiosInstance";
import { AUTH_ENDPOINTS } from "./endpoints";

export const loginUser = async (payload) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, payload);
    return response.data; // return only data, not full response
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Let the caller handle the error properly
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, payload);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};