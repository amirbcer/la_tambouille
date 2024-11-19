import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, FileInput, Input } from 'react-daisyui';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FaFloppyDisk } from 'react-icons/fa6';
import { Recipe, RecipeParams } from '../../models/Recipe';
import { apiUrl } from '../../services/ApiService';

interface MyRecipesFormProps {
  myRecipe?: Recipe;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: RecipeParams) => void;
}

function MyRecipesForm({ myRecipe, onSubmit }: MyRecipesFormProps) {
  const cardTitle = myRecipe ? 'Modifier la recette' : 'Ajouter une recette';
  const [content, setContent] = useState(EditorState.createEmpty());
  const [updatePicture, setUpdatePicture] = useState(false);
  const [recipe, setRecipe] = useState<RecipeParams>({
    title: '',
    content: '',
  });

  useEffect(() => {
    setRecipe({
      title: myRecipe?.title ?? '',
      content: myRecipe?.content ?? '',
    });

    if (myRecipe?.content) {
      const block = htmlToDraft(myRecipe?.content);
      if (block) {
        const contentState = ContentState.createFromBlockArray(block.contentBlocks, block.entityMap);
        setContent(EditorState.createWithContent(contentState));
      }
    }
  }, [myRecipe]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setRecipe((prev) => ({ ...prev, picture: file }));
    }
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setContent(editorState);
    setRecipe((prev) => ({
      ...prev,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const addRecipe = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(recipe);
  };

  return (
    <Card className="flex flex-col shadow bg-white h-[80vh]">
      <Card.Body className="border h-full">
        <form onSubmit={addRecipe} className="flex flex-col h-full space-y-4">
          <div className="flex justify-between items-center">
            <Card.Title>{cardTitle}</Card.Title>
            <Button color="info" className="text-white font-bold" size="md" type="submit">
              <FaFloppyDisk className="text-xl" />
              Sauvegarder
            </Button>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="w-full sm:w-1/2">
              <label htmlFor="title" className="label">
                <span className="text-md font-bold text-gray-700">
                  Titre de la recette <sup className="text-red-600">*</sup>
                </span>
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Titre"
                className="w-full bg-gray-100 border-none rounded-none"
                onChange={handleInput}
                value={recipe.title}
                required
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label htmlFor="picture" className="label">
                <span className="text-md font-medium text-gray-700">Image d'illustration</span>
              </label>
              <div className="relative">
                {!updatePicture && myRecipe?.picture ? (
                  <div className="w-full h-48 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <Card.Image
                      className="object-cover w-full h-full"
                      src={`${apiUrl}${myRecipe.picture}`}
                      alt="Image d'illustration"
                    />
                    <Button
                      onClick={() => setUpdatePicture(true)}
                      color="info"
                      className="absolute bottom-2 left-2 w-auto text-white rounded-none text-xs"
                      size="xs"
                    >
                      Modifier
                    </Button>
                  </div>
                ) : (
                  <FileInput
                    id="picture"
                    name="picture"
                    className="w-full bg-gray-100 border-none rounded-none"
                    onChange={handleFileChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="label">
              <span className="text-md font-medium text-gray-700">Description (ingrédients, étapes, etc.)</span>
            </label>
          </div>
          <div className="grow border bg-gray-100 overflow-hidden">
            <Editor
              editorState={content}
              wrapperClassName="h-full"
              editorClassName="px-4 overflow-y-auto"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default MyRecipesForm;
