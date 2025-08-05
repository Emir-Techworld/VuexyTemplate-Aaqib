import api from "./axiosInstance";

const LOGIN_ENDPOINT = "api/Authenticate/login";
const REGISTER_ENDPOINT = "api/Authenticate/login";

export const loginUser = async (payload) => {
  try {
    const response = await api.post(LOGIN_ENDPOINT, payload);
    return response.data; // return only data, not full response
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Let the caller handle the error properly
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await api.post(REGISTER_ENDPOINT, payload);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};