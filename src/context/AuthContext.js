import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log('in theme context')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toast = useToast()

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      navigate('/active-sale-orders');
      toast({
        title: 'Logged in.',
        // description: "..",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    
    setIsAuthenticated(false);
    navigate('/login');
    toast({
        title: 'Logged out.',
        // description: "..",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
