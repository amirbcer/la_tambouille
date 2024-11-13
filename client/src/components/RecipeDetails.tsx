import { Recipe } from '../models/Recipe';

interface RecipeDetailsProps {
  recipe: Recipe;
}

function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="flex flex-col items-center space-y-8 text-center m-12">
      <img
        src="https://cache.marieclaire.fr/data/photo/w1200_h630_c17/6m/recettes-saines-equilibrees-pour-la-rentree.jpg"
        alt="recipe-logo"
        className="w-full max-w-xs lg:max-w-sm rounded-lg object-cover"
      />
      <div className="flex flex-col items-center space-y-4">
        <span className="text-lg font-semibold">Proposée par : {recipe.author}</span>

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-3">Ingrédients</h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="text-sm">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-3">Étapes</h2>
          <ul className="space-y-2">
            {recipe.steps?.map((step, index) => (
              <li key={index} className="text-sm ">
                {index + 1}. {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
