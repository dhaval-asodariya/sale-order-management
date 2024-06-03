import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Login';
import SalesDashboard from './pages/SalesDashboard';
import ThemeToggle from './components/ThemeToggle';
import theme from './theme';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
console.log('home page rendered')

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        
          <div>
            <Navbar/>
            
            
            {/* <ThemeToggle /> */}
            <Box sx={{maxWidth:'1500px',margin:'auto'}}>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/active-sale-orders"
                element={
                  <PrivateRoute>
                    <SalesDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/completed-sale-orders"
                element={
                  <PrivateRoute>
                    <SalesDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/active-sale-orders" />} />
            </Routes>
            </Box>
          </div>
        
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
