import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthProvider';
import { RegisterParams } from '../models/Auth';
import { userService } from '../services/UserService';

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleRegister = async (params: RegisterParams) => {
    await userService.create(params);

    navigate('/login');
  };

  useEffect(() => {
    if (auth?.isLoggedIn) navigate('/recipes');
  });

  return (
    <div className="flex items-center px-16">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

export default Register;
