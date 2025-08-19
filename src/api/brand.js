import api from "./axiosInstance";
import { BRAND_ENDPOINTS } from "./endpoints";

export const GetAllBrandsApi = async () => {
    try {
        const response = await api.get(BRAND_ENDPOINTS.GET_ALLBRANDS);
        return response.data;
    } catch (error) {
        console.error("GetAllBrandsApi error:", error.response?.data || error.message);
        throw error;
    }
};

export const addBrandApi = async (payload) => {
    try {
        const response = await api.post(BRAND_ENDPOINTS.INSERT_BRAND, payload);
        return response.data;
    } catch (error) {
        console.error("AddBrandApi error:", error.response?.data || error.message);
        throw error;
    }
};
