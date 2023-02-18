import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

import { createClient } from '@supabase/supabase-js';
import { supabase } from './lib/api';

function App({ idToken }: any) {


  return (
    <ChakraProvider theme={theme}>
      <AuthPage />
    </ChakraProvider>
  );
}

export default App;
