import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthProvider';
import { LoginParams } from '../models/Auth';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogin = (params: LoginParams) => auth?.login(params);

  useEffect(() => {
    if (auth?.isLoggedIn) navigate('/recipes');
  });

  return (
    <div className="flex items-center px-16">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
