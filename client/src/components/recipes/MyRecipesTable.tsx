/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from 'react';
import { Button, Loading, Mask, Modal, Pagination, Table } from 'react-daisyui';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '../../models/Recipe';
import { apiUrl } from '../../services/ApiService';

interface MyRecipesTableProps {
  recipes: Recipe[];
  loading: boolean;
  total: number;
  changePage: (page: number) => void;
  deleteRecipe: (recipeId: number) => void;
}

function MyRecipesTable({ recipes, loading, total, changePage, deleteRecipe }: MyRecipesTableProps) {
  const numberOfPages = Math.ceil(total / 12);
  const navigate = useNavigate();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShow = useCallback(
    (recipeId: number) => {
      setSelectedRecipeId(recipeId);
      modalRef.current?.showModal();
    },
    [modalRef],
  );

  const handlePage = (page: number) => {
    setCurrentPage(page);
    changePage(page);
  };

  const handleDelete = async (recipeId: number) => {
    await deleteRecipe(recipeId);

    if (recipes.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      changePage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-12">
        <Loading size="lg" className="text-2xl text-blue-500" />
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="text-center text-md font-semibold m-5">
        <div>Aucune recette à afficher.</div>
      </div>
    );
  }

  return (
    <div>
      <Table size="lg" zebra className="shadow border border-t-0">
        <Table.Head className="text-center">
          <span />
          <span>Titre</span>
          <span>Actions</span>
        </Table.Head>
        <Table.Body>
          {recipes.map((recipe: Recipe, index) => (
            <Table.Row key={index} className="text-center">
              {recipe.picture ? (
                <Mask className="w-32 h-32 object-cover" variant="squircle" src={`${apiUrl}${recipe.picture}`} />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-xl">
                  <span className="text-gray-500 text-sm">Pas d'image</span>
                </div>
              )}
              <Link to={`/recipes/${recipe.id}`}>
                <div className="w-64 cursor-pointer hover:underline truncate ellipsis overflow-hidden">
                  {recipe.title}
                </div>
              </Link>
              <span className="space-x-2 flex justify-center">
                <Button shape="square" size="sm" color="info" onClick={() => navigate(`${recipe.id}/edit`)}>
                  <FaEdit color="white" />
                </Button>
                <Button shape="square" size="sm" color="error" onClick={() => handleShow(recipe.id)}>
                  <FaTrashAlt color="white" />
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination className="flex w-full justify-center space-x-2 py-3 bg-gray-100 shadow border rounded rounded-t-none">
        {Array.from({ length: numberOfPages }, (_, i) => (
          <Button active={currentPage === i + 1} className="shadow" key={i} onClick={() => handlePage(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Pagination>

      {/* DELETE MODAL */}
      <Modal ref={modalRef} backdrop>
        <Modal.Header className="font-bold">Supprimer la recette</Modal.Header>
        <Modal.Body className="p-5">Es-tu sur de vouloir supprimer cette recette ?</Modal.Body>
        <Modal.Actions>
          <form method="dialog" className="flex w-full space-x-3 justify-around">
            <Button className="w-36">Annuler</Button>
            {selectedRecipeId ? (
              <Button onClick={() => handleDelete(selectedRecipeId)} color="error" className="text-white w-36">
                Supprimer
              </Button>
            ) : null}
          </form>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MyRecipesTable;
