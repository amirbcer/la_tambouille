import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import RecipesList from './pages/RecipesList';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/recipes" element={<RecipesList />} />
      <Route path="*" element={<Navigate to="/recipes" />} />
    </Routes>
  </Router>,
);
