import { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function useRecipes(page: number) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const currentRecipes = await recipeService.getPublicRecipes(page);

        setFullyLoaded(currentRecipes.length < 12);
        setRecipes((previousRecipes) => [...previousRecipes, ...currentRecipes]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  return { recipes, loading, fullyLoaded };
}

export default useRecipes;
