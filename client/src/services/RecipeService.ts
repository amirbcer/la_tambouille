import axios from 'axios';
import { Recipe } from '../models/Recipe';

const API_URL = 'http://localhost:3000/api/v1/recipes';

export const RecipeService = {
  async getAll(page: number): Promise<Recipe[]> {
    const response = await axios.get(`${API_URL}.json`, {
      params: {
        page,
      },
    });

    return response.data;
  },

  async getById(id: number): Promise<Recipe> {
    const response = await axios.get(`${API_URL}/${id}.json`);

    return response.data;
  },
};
