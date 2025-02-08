export const API_URL = import.meta.env.VITE_API_URL;

export const getToken = () => {
  return localStorage.getToken('auth-token');
}