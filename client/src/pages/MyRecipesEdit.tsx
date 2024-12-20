import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyRecipesForm from '../components/recipes/MyRecipesForm';
import { useAuth } from '../context/AuthProvider';
import { Recipe, RecipeParams } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function MyRecipesEdit() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);

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
        navigate('/my-recipes');
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleSubmit = async (params: RecipeParams) => {
    if (!auth?.currentUser) throw new Error('Invalid user provided.');
    await recipeService.upsertMyRecipe(auth.currentUser.id, params, 'edit', recipe.id);
    navigate('/my-recipes');
  };

  return (
    <div className="px-60 py-16 w-full">
      <MyRecipesForm onSubmit={handleSubmit} myRecipe={recipe} />
    </div>
  );
}

export default MyRecipesEdit;
