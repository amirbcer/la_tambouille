import axios from 'axios';

export const apiUrl = import.meta.env.DEV ? 'http://localhost:3000' : '';

const apiService = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});

export default apiService;
