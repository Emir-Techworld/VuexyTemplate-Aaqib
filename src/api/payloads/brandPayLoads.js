// Creates a payload for creating a new brand.
export const createBrandPayload = (brandName, description, createdBy) => ({
  brandName,
  description,
  createdBy,
});

// Creates a payload for updating an existing brand.
export const updateBrandPayload = (brand, modifiedBy) => ({
  ...brand,
  modifiedBy,
});
