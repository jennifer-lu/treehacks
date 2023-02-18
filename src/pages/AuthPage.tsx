import React, { useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { supabase } from '../lib/api';




const AuthPage = () => {
  useEffect(() => {
    async function fetchHelloWorld() {
      try {
        const { data, error } = await supabase.functions.invoke('hello-world', {
          body: { name: 'Functions' },
        });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchHelloWorld();
  }, []);

  return (
    <Flex direction="column" align="center">
      <Heading>platedate</Heading>
    </Flex>
  );
};

export default AuthPage;
