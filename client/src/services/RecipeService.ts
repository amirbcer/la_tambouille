import { Recipe, RecipeParams } from '../models/Recipe';
import apiService from './ApiService';

type NewOrEdit = 'edit' | 'new';

export const recipeService = {
  // PUBLIC ROUTES
  async getPublicRecipes(page: number): Promise<Recipe[]> {
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

  // PRIVATE ROUTES
  async getMyRecipes(
    userId: number,
    page: number,
  ): Promise<{
    recipes: Recipe[];
    total: number;
  }> {
    const { data } = await apiService.get(`users/${userId}/recipes.json`, {
      params: {
        page,
      },
    });

    return data.data;
  },

  async upsertMyRecipe(userId: number, recipe: RecipeParams, newOrEdit: NewOrEdit, recipeId?: number) {
    const formData = new FormData();
    formData.append('recipe[title]', recipe.title);
    formData.append('recipe[content]', recipe.content);
    if (recipe.picture) formData.append('recipe[picture]', recipe.picture);

    const { data } = await (newOrEdit === 'new'
      ? apiService.post(`users/${userId}/recipes.json`, formData)
      : apiService.put(`users/${userId}/recipes/${recipeId}.json`, formData));

    return data;
  },

  async deleteMyRecipe(userId: number, recipeId: number) {
    const { data } = await apiService.delete(`users/${userId}/recipes/${recipeId}.json`);

    return data;
  },
};
