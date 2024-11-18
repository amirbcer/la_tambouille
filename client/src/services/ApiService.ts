import axios from 'axios';

export const apiUrl = 'http://localhost:3000';

const apiService = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});

export default apiService;
