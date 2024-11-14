import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthProvider';
import { LoginParams } from '../models/Auth';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.isLoggedIn) navigate('/recipes');

  const handleLogin = (params: LoginParams) => auth?.login(params);

  return <LoginForm onSubmit={handleLogin} />;
}

export default Login;
