import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AuthGuard = () => {
  const user = useAuth();

  if (!user?.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default AuthGuard;
