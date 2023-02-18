import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AuthPage from './pages/AuthPage';
import NewProfilePage from './pages/NewProfilePage';

import theme from './theme/theme';

import AuthContext from './contexts/AuthContext';

import { createClient } from '@supabase/supabase-js';
import { supabase } from './lib/api';

function App({ idToken }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true',
  );

  const login = (password: string, username: string) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {isAuthenticated ? <NewProfilePage /> : <AuthPage />}
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
