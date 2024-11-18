import { Button, Card, Tooltip } from 'react-daisyui';
import { MdMessage } from 'react-icons/md';
import { useAuth } from '../../context/AuthProvider';
import { Recipe } from '../../models/Recipe';
import { apiUrl } from '../../services/ApiService';

interface RecipeDetailsProps {
  recipe: Recipe;
  openChat: () => void;
}

function RecipeDetails({ recipe, openChat }: RecipeDetailsProps) {
  const auth = useAuth();

  const chatButton = (
    <Button onClick={() => openChat()} disabled={!auth?.currentUser} color="info" className="text-white">
      <MdMessage className="text-lg" />
      Chat Live
    </Button>
  );

  return (
    <Card className="flex flex-col items-center text-center m-12 w-1/2 shadow-lg">
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl rounded-b-none">
        <Card.Image src={`${apiUrl}${recipe.picture}`} alt={recipe.title} />
      </div>

      <Card.Body className="bg-white rounded-xl w-full rounded-t-none">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col text-start">
            <span className="text-2xl font-semibold">{recipe.title}</span>
            <span className="text-md font-semibold">Recette postée par {recipe.author}</span>
          </div>

          {!auth?.currentUser ? (
            <Tooltip message="Connecte toi pour échanger sur cette recette">{chatButton}</Tooltip>
          ) : (
            chatButton
          )}
        </div>

        <div className="prose prose-lg text-left mt-6" dangerouslySetInnerHTML={{ __html: recipe.content }} />
      </Card.Body>
    </Card>
  );
}

export default RecipeDetails;
