import React from 'react';
import AuthPage from './pages/AuthPage';

import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
        <AuthPage />
    </ChakraProvider>
  );
}

export default App;
