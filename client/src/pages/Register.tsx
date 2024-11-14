import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthProvider';
import { RegisterParams } from '../models/Auth';
import { userService } from '../services/UserService';

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.isLoggedIn) navigate('/recipes');

  const handleRegister = async (params: RegisterParams) => {
    await userService.create(params);

    navigate('/login');
  };

  return <RegisterForm onSubmit={handleRegister} />;
}

export default Register;
