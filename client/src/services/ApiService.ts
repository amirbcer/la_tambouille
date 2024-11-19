import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;
export const wsUrl = import.meta.env.VITE_WS_URL;

const apiService = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});

export default apiService;
