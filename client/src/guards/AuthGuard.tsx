import { Loading } from 'react-daisyui';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AuthGuard = () => {
  const auth = useAuth();
  const hasSession = localStorage.getItem('hasSession');
  const redirectToLogin = <Navigate to="/login" />;

  if (!hasSession) {
    return redirectToLogin;
  }

  if (auth?.loading) {
    return <Loading size="lg" className="text-2xl text-blue-500" />;
  }

  if (!auth?.currentUser) {
    return redirectToLogin;
  }

  return <Outlet />;
};

export default AuthGuard;
