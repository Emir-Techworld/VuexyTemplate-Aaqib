// Creates a register payload
export const createRegisterPayload = (username, email, password, confirmPassword) => ({
  username,
  email,
  password,
  confirmPassword,
});

// Creates a login payload
export const createLoginPayload = (username, password) => ({
  username,
  password,
});
