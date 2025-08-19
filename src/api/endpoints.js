// A common prefix for all API endpoints.
// If your API version changes (e.g., to 'api/v2'), you only need to update it here.
const API_PREFIX = "api";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_PREFIX}/Authenticate/login`,
  REGISTER: `${API_PREFIX}/Authenticate/register`,
};

export const BRAND_ENDPOINTS = {
  GET_ALLBRANDS: `${API_PREFIX}/Brand/GetAllBrand`,
  GET_BRAND_BY_ID: `${API_PREFIX}/Brand/GetBrandById`,
  INSERT_BRAND: `${API_PREFIX}/Brand/AddBrand`,
  UPDATE_BRAND: `${API_PREFIX}/Brand/UpdateBrand`,
  DELETE_BRAND: `${API_PREFIX}/Brand/DeleteBrand`,

};
