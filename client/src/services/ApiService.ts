import axios from 'axios';

export const apiUrl = 'http://localhost:3000';

const apiService = axios.create({
  baseURL: `${apiUrl}/api/v1`,
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;

  return config;
});

export default apiService;
