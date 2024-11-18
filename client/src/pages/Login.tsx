import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthProvider';
import useToast from '../hooks/useToast';
import { LoginParams } from '../models/Auth';

function Login() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const hasShownToast = useRef(false);

  const handleLogin = async (params: LoginParams) => {
    try {
      await auth?.login(params);
    } catch (error) {
      showToast({ message: 'Email ou mot de passe incorrect.', type: 'error' });
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) navigate('/recipes');
  });

  useEffect(() => {
    if (location.state?.toast && !hasShownToast.current) {
      const { message, type } = location.state.toast;
      showToast({ message, type });
      hasShownToast.current = true;
    }
  }, [location.state, showToast]);

  return (
    <div className="flex items-center px-16">
      <LoginForm onSubmit={handleLogin} />
      <ToastComponent />
    </div>
  );
}

export default Login;
