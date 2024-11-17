import { Card } from 'react-daisyui';
import { Recipe } from '../../models/Recipe';
import { apiUrl } from '../../services/ApiService';

interface RecipeDetailsProps {
  recipe: Recipe;
}

function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <Card className="flex flex-col items-center text-center m-12 w-1/2 shadow-lg">
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl rounded-b-none">
        <Card.Image src={`${apiUrl}${recipe.picture}`} alt={recipe.title} />
      </div>

      <Card.Body className="bg-white rounded-xl  w-full rounded-t-none">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-2xl font-semibold">{recipe.title}</span>
          <span className="text-md font-semibold">Recette postée par {recipe.author}</span>
        </div>
        <div className="prose prose-lg text-left mt-6" dangerouslySetInnerHTML={{ __html: recipe.content }} />
      </Card.Body>
    </Card>
  );
}

export default RecipeDetails;
