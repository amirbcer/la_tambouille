import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AuthGuard = () => {
  const auth = useAuth();

  if (!auth?.isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};

export default AuthGuard;
