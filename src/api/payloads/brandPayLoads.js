// Creates a payload for creating a new brand.
export const createBrandPayload = (brandName, description) => ({
  brandName,
  description,
  createdBy: JSON.parse(localStorage.getItem('userData'))?.userName,
});

// Creates a payload for updating an existing brand.
export const updateBrandPayload = (brand) => ({
  ...brand,
  modifiedBy: JSON.parse(localStorage.getItem('userData'))?.userName,
});
