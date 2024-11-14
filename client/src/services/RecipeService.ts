import { Recipe } from '../models/Recipe';
import apiService from './ApiService';

export const recipeService = {
  async getAll(page: number): Promise<Recipe[]> {
    const response = await apiService.get(`recipes.json`, {
      params: {
        page,
      },
    });

    return response.data;
  },

  async getById(id: number): Promise<Recipe> {
    const response = await apiService.get(`recipes/${id}.json`);

    return response.data;
  },
};
