import React, { useContext, useState } from 'react';
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
import { url } from '../url';

const AuthPage = () => {
  // useEffect(() => {
  //   async function fetchBackend() {
  //     await fetch(`${url}/createPreference`, {
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // method: 'POST',
  // body: JSON.stringify({
  //   userID: 1,
  //   prefs: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // }),
  //     })
  //       .then((res) => res.json())
  //       .then(console.log)
  //       .catch((e) => console.log(e));
  //   }
  //   fetchBackend();
  // }, []);

  // useEffect(() => {
  //   async function fetchBackend() {
  //   await fetch('/login?mail=1&password=123')
  //     .then((res) => res.json())
  //     .then(console.log)
  //     .catch((e) => console.log(e));
  //   }
  //   fetchBackend();
  // }, []);
  const { isAuthenticated, signup, login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
            <Input
              type="email"
              focusBorderColor="green.600"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input
              type="password"
              focusBorderColor="green.600"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Flex mt="16px" gap="16px">
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => signup(email, password)}
            >
              sign up
            </Button>
            <Button
              variant="filled"
              colorScheme="green"
              onClick={() => login(email, password)}
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
