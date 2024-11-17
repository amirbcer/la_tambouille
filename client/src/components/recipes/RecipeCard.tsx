import { Card } from 'react-daisyui';
import { IoPerson } from 'react-icons/io5';
import { Recipe } from '../../models/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="bg-white border-solid border-2 border-gray-200 hover:bg-blue-300 hover:border-blue-300 transform transition p-2 shadow duration-300 hover:scale-105 cursor-pointer hover:shadow-xl h-full">
      <Card.Image className="flex justify-center w-40" src={recipe.picture} alt={recipe.title} />
      <Card.Body className="font-semibold text-lg justify-center">{recipe.title}</Card.Body>
      <Card.Actions className="px-4 py-2 border-t">
        <div className="flex items-center">
          <IoPerson className="mr-2 text-xl" />
          <span className="font-semibold">{recipe.author}</span>
        </div>
      </Card.Actions>
    </Card>
  );
}

export default RecipeCard;