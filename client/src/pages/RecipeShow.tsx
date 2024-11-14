import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import RecipeDetails from '../components/recipes/RecipeDetails';
import { Recipe } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function RecipeShow() {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [error, setError] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id || isNaN(Number(id))) {
          throw new Error('Invalid ID provided : must be a valid number.');
        }

        const recipe = await recipeService.getById(+id);
        setRecipe(recipe);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <Navigate to="/recipes" replace={true} />;

  return <RecipeDetails recipe={recipe} />;
}

export default RecipeShow;
