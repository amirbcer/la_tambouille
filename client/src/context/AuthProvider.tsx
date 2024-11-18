import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../models/Auth';
import { User } from '../models/User';
import apiService from '../services/ApiService';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string;
  user: User | null;
  isLoggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const getIsLoggedIn = storedToken !== null && storedUser !== null;

  const [token, setToken] = useState<string>(storedToken || '');
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn);

  const login = async (user: LoginParams) => {
    const { data, status } = await apiService.post('session.json', { user });

    if (status === 200) {
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/recipes');
      return;
    }
  };

  const logout = async () => {
    try {
      const { data, status } = await apiService.delete('session.json');

      if (status === 200) {
        setUser(null);
        setToken('');
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
        return;
      }

      throw new Error(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
