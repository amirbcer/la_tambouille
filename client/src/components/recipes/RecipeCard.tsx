import { Card } from 'react-daisyui';
import { IoPerson } from 'react-icons/io5';
import { Recipe } from '../../models/Recipe';
import { apiUrl } from '../../services/ApiService';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="bg-white border-solid border-2 border-gray-200 hover:bg-blue-300 hover:border-blue-300 transform transition p-2 shadow duration-300 hover:scale-105 cursor-pointer hover:shadow-xl w-64 flex flex-col">
      <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        {recipe.picture ? (
          <Card.Image
            className="w-full h-full object-cover aspect-square"
            src={`${apiUrl}${recipe.picture}`}
            alt={recipe.title}
          />
        ) : (
          <span className="text-gray-500">Aucune image</span>
        )}
      </div>
      <Card.Body>
        <span className="text-lg font-semibold line-clamp-2 h-14 mb-4">{recipe.title}</span>
        <Card.Actions className="border-t flex flex-row items-center justify-center">
          <div className="flex flex-row justify-center items-center space-x-2 pt-5">
            <IoPerson className="text-lg" />
            <span className="font-semibold">{recipe.author}</span>
          </div>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
