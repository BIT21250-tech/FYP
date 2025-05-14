// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set token to localStorage and axios headers
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage and axios headers
export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};