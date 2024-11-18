import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeDetails from '../components/recipes/RecipeDetails';
import { Recipe } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function RecipeShow() {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id || isNaN(Number(id))) {
          throw new Error('Invalid ID provided');
        }

        const recipe = await recipeService.getById(+id);
        setRecipe(recipe);
      } catch (err) {
        console.error(err);
        navigate('/recipes');
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  return <RecipeDetails recipe={recipe} openChat={() => navigate('chat')} />;
}

export default RecipeShow;
