import { Button, Navbar } from 'react-daisyui';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function RecipeNavbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const goToLogin = () => navigate('/login');
  const logout = () => auth?.logout();

  return (
    <Navbar className="flex fixed z-10 shadow justify-between items-center p-5 bg-gradient-to-r from-cyan-500 to-blue-500 h-16 ">
      <Link to={`/recipes`}>
        <h1 className="text-2xl font-bold text-white">La Tambouille 🍽️</h1>
      </Link>

      {auth?.isLoggedIn && auth?.user && (
        <div className="text-white text-lg font-bold mr-4">
          <p>Bienvenue, {auth.user.name} 😀👋</p>
        </div>
      )}

      {auth?.isLoggedIn ? (
        <div className="flex items-center">
          <Button size="sm" className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded mr-4">
            Mes Recettes
          </Button>
          <Button size="sm" className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded" onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          className="bg-white hover:bg-blue-100 text-blue-500 font-semibold rounded "
          onClick={goToLogin}
        >
          Se connecter
        </Button>
      )}
    </Navbar>
  );
}

export default RecipeNavbar;
