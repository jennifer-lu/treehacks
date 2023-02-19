import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AuthPage from './pages/AuthPage';
import NewProfilePage from './pages/NewProfilePage';

import theme from './theme/theme';

import AuthContext from './contexts/AuthContext';

import { Route } from 'react-router';

import { BrowserRouter, Routes, Navigate } from 'react-router-dom';

import MatchPage from './pages/MatchPage';

function App({ idToken }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true',
  );

  const login = (password: string, username: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/new" element={<NewProfilePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
