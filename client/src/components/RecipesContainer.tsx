import { Link } from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import RecipeCard from './RecipeCard';
import { Loading } from 'react-daisyui';
import { TbMoodEmpty } from 'react-icons/tb';

interface RecipesContainerProps {
  recipes: Recipe[];
  loading: boolean;
}

function RecipesContainer({ recipes, loading }: RecipesContainerProps) {
  return (
    <div className="mx-auto my-12 px-8 lg:mx-12 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {recipes.map((recipe: Recipe, index) => (
          <Link to={`/recipes/${recipe.id}`} key={index}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-7">
        {loading && <Loading size="lg" className="text-2xl text-blue-500" />}
        {!loading && recipes.length === 0 && (
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <div>Aucune recette n'a été trouvée</div>
            <TbMoodEmpty className="text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesContainer;