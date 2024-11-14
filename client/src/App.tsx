import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RecipeNavbar from './components/RecipeNavbar';
import AuthProvider from './context/AuthProvider';
import Login from './pages/Login';
import RecipeShow from './pages/RecipeShow';
import RecipesList from './pages/RecipesList';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <RecipeNavbar />
          <div className="flex justify-center items-center grow mt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<RecipesList />} />
              <Route path="/recipes/:id" element={<RecipeShow />} />
              <Route path="*" element={<Navigate to="/recipes" />} />
              {/* <Route element={<AuthGuard />}></Route> */}
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
