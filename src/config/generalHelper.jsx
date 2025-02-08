export const API_URL = import.meta.env.VITE_API_URL;
export const ZIP_CODE_URL = import.meta.env.VITE_API_ZIP_CODE;

export const getToken = () => {
  return localStorage.getItem("auth-token");
}

export const getProfile = () => {
  return localStorage.getItem('user-profile');
}