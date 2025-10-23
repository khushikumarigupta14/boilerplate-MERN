export const validationUtils = {
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isStrongPassword: (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password),
  isEmpty: (value) =>
    value === null || value === undefined || value === "",
};
