import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../models/Auth';
import { User } from '../models/User';
import apiService from '../services/ApiService';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: User | null;
  checkSession: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const checkSession = async () => {
    try {
      const { data, status } = await apiService.get('session.json');

      if (status === 200) {
        setCurrentUser(data.user);
        return;
      }

      throw new Error(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (user: LoginParams) => {
    const response = await apiService.post('session.json', user);
    if (response.status === 200) {
      setCurrentUser(response.data.user);

      navigate('/recipes');
      return;
    }
  };

  const logout = async () => {
    try {
      const { data, status } = await apiService.delete('session.json');

      if (status === 200) {
        setCurrentUser(null);

        navigate('/login');
        return;
      }

      throw new Error(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return <AuthContext.Provider value={{ currentUser, checkSession, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
