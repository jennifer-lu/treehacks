import React, { useContext } from 'react';
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Card,
  Button,
  Text,
} from '@chakra-ui/react';
import plateImage from '../assets/plate.png';

import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const AuthPage = () => {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/new" replace />;
  }

  return (
    <Flex direction="column" align="center" justify="center" h="100vh" p="32px">
      <Image src={plateImage} alt="Noodles" h="120px" mb="24px" />
      <Text>welcome to</Text>
      <Heading size="2xl" mb="32px">
        plate-date
      </Heading>
      <Card variant="outline" width="100%">
        <Flex
          direction="column"
          align="center"
          justify="center"
          p="32px"
          gap="16px"
        >
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input type="email" focusBorderColor="green.600" />
          </FormControl>
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input type="password" focusBorderColor="green.600" />
          </FormControl>
          <Flex mt="16px" gap="16px">
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => login('', '')}
            >
              sign up
            </Button>
            <Button
              variant="filled"
              colorScheme="green"
              onClick={() => login('', '')}
            >
              log in
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AuthPage;
