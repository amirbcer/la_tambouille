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

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  },
);

export default apiService;
