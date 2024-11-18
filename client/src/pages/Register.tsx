import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthProvider';
import useToast from '../hooks/useToast';
import { RegisterParams } from '../models/Auth';
import { userService } from '../services/UserService';

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();

  const handleRegister = async (params: RegisterParams) => {
    try {
      await userService.create(params);

      navigate('/login', {
        state: {
          toast: { message: 'Inscription réussie, vous pouvez vous connecter.', type: 'success' },
        },
      });
    } catch (error) {
      console.error(error);

      showToast({ message: 'Un problème est survenu, veuillez réessayer plus tard.', type: 'error' });
    }
  };

  useEffect(() => {
    if (auth?.currentUser) navigate('/recipes');
  });

  return (
    <div className="flex items-center px-16">
      <RegisterForm onSubmit={handleRegister} />
      <ToastComponent />
    </div>
  );
}

export default Register;
