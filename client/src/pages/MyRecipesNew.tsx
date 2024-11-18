import { useNavigate } from 'react-router-dom';
import MyRecipesForm from '../components/recipes/MyRecipesForm';
import { useAuth } from '../context/AuthProvider';
import { RecipeParams } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function MyRecipesNew() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (params: RecipeParams) => {
    if (!auth?.currentUser) throw new Error('Invalid user provided.');
    await recipeService.upsertMyRecipe(auth?.currentUser?.id, params, 'new');
    navigate('/my-recipes');
  };

  return (
    <div className="px-60 py-16 w-full">
      <MyRecipesForm onSubmit={handleSubmit} />
    </div>
  );
}

export default MyRecipesNew;
