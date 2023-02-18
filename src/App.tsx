import React from 'react';
import AuthPage from './pages/AuthPage';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
        <AuthPage />
    </ChakraProvider>
  );
}

export default App;
