import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const useAuthHook = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated,
      loading: false,
    }));
  }, [isAuthenticated]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));
      await login(email, password);
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        loading: false,
      }));
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  const handleLogout = async () => {
    try {
      setAuthState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));
      await logout();
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
        loading: false,
      }));
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  return {
    ...authState,
    handleLogin,
    handleLogout,
  };
};

export default useAuthHook;
