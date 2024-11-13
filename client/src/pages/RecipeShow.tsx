import { useEffect, useState } from 'react';
import { RecipeService } from '../services/RecipeService';
import { Recipe } from '../models/Recipe';
import { Link, Navigate, useParams } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';
import RecipeDetails from '../components/RecipeDetails';

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

        const recipe = await RecipeService.getById(+id);
        setRecipe(recipe);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <Navigate to="/recipes" replace={true} />;

  return (
    <div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-96 justify-center items-center flex">
        <div className="text-white font-bold">
          <p className="lg:text-3xl">{recipe.title}</p>
          <Link to={`/recipes`}>
            <div className="flex justify-center items-center mt-2 hover:text-blue-200">
              <RiArrowGoBackFill className="text-xl mr-2" />
              <span>Retour aux recettes</span>
            </div>
          </Link>
        </div>
      </div>
      <RecipeDetails recipe={recipe} />
    </div>
  );
}

export default RecipeShow;
