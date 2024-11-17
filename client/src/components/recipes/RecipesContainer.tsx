import { Loading } from 'react-daisyui';
import { TbMoodEmpty } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Recipe } from '../../models/Recipe';
import RecipeCard from './RecipeCard';

interface RecipesContainerProps {
  recipes: Recipe[];
  loading: boolean;
}

function RecipesContainer({ recipes, loading }: RecipesContainerProps) {
  return (
    <div className="flex flex-col mx-8 my-12 lg:mx-16 xl:mx-32 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
