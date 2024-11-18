import { useEffect } from 'react';
import { Button, Navbar } from 'react-daisyui';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function RecipeNavbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);
  const logout = () => auth?.logout();

  useEffect(() => {
    if (!auth?.currentUser) {
      auth?.checkSession();
    }
  }, [auth]);

  return (
    <Navbar className="flex w-full fixed z-10 shadow justify-between items-center p-5 bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link to={`/recipes`}>
        <h1 className="text-2xl font-bold text-white">La Tambouille 🍽️</h1>
      </Link>

      {auth?.currentUser ? (
        <div className="flex items-center">
          <Button
            size="sm"
            className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded mr-4"
            onClick={() => navigateTo('/my-recipes')}
          >
            Mes recettes
          </Button>
          <Button size="sm" className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded" onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded "
          onClick={() => navigateTo('/login')}
        >
          Se connecter
        </Button>
      )}
    </Navbar>
  );
}

export default RecipeNavbar;
