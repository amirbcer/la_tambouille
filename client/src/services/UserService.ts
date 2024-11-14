import { RegisterParams } from '../models/Auth';
import { User } from '../models/User';
import apiService from './ApiService';

export const userService = {
  async create(user: RegisterParams): Promise<User> {
    const response = await apiService.post(`users.json`, { user });

    return response.data;
  },
};
