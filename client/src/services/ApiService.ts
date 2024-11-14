import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;

  return config;
});

export default apiService;
