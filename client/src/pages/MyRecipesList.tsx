import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MyRecipesTable from '../components/recipes/MyRecipesTable';
import { useAuth } from '../context/AuthProvider';
import { Recipe } from '../models/Recipe';
import { recipeService } from '../services/RecipeService';

function MyRecipesList() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const changePage = (page: number) => setPage(page);

  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);

      if (!auth?.currentUser) {
        throw new Error('Invalid user provided.');
      }

      const { recipes, total } = await recipeService.getMyRecipes(auth.currentUser.id, page);

      setRecipeList(recipes);
      setTotal(total);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [auth?.currentUser, page]);

  const deleteRecipe = async (recipeId: number) => {
    if (!auth?.currentUser) return;

    try {
      await recipeService.deleteMyRecipe(auth.currentUser.id, recipeId);

      const updatedList = recipeList.filter((recipe) => recipe.id !== recipeId);
      setRecipeList(updatedList);
      setTotal(total - 1);

      if (!updatedList.length && page > 1) setPage(page - 1);
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <div className="my-20 px-12">
      <div className="text-lg font-semibold mb-6 text-start">
        <span>Ravi de te revoir, {auth?.currentUser?.name} 😀👋</span>
      </div>
      <div className="flex flex-row justify-between items-center bg-gray-100 p-5 rounded-md border border-b-0 space-x-5">
        <span className="text-xl font-semibold">Liste de mes recettes</span>
        <Button color="info" className="text-white font-bold" onClick={() => navigate('new')}>
          <IoAdd className="text-2xl" />
          Nouvelle recette
        </Button>
      </div>
      <MyRecipesTable
        recipes={recipeList}
        total={total}
        loading={loading}
        changePage={changePage}
        deleteRecipe={deleteRecipe}
      />
    </div>
  );
}

export default MyRecipesList;
