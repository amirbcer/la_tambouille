import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RecipeNavbar from './components/RecipeNavbar';
import AuthProvider from './context/AuthProvider';
import AuthGuard from './guards/AuthGuard';
import Login from './pages/Login';
import MyRecipesEdit from './pages/MyRecipesEdit';
import { default as MyRecipesList } from './pages/MyRecipesList';
import MyRecipesNew from './pages/MyRecipesNew';
import RecipeShow from './pages/RecipeShow';
import RecipesList from './pages/RecipesList';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <RecipeNavbar />
          <div className="flex justify-center grow mt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<RecipesList />} />
              <Route path="/recipes/:id" element={<RecipeShow />} />
              <Route element={<AuthGuard />}>
                <Route path="/my-recipes" element={<MyRecipesList />} />
                <Route path="/my-recipes/:id/edit" element={<MyRecipesEdit />} />
                <Route path="/my-recipes/new" element={<MyRecipesNew />} />
              </Route>
              <Route path="*" element={<Navigate to="/recipes" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
