import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Card,
  Button,
  Text,
} from '@chakra-ui/react';
import Menu from '../components/Menu';
import Select from 'react-select';

import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const options = [
  { value: 'vegan', label: 'vegan' },
  { value: 'vegetarian', label: 'vegetarian' },
  { value: 'nonuts', label: 'no nuts' },
];

const MatchPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Menu />
      <Flex direction="column" align="center" p="32px">
        <Text>{confirmed ? "you're" : "you've been"}</Text>
        <Heading size="2xl" mb="32px">
          {confirmed ? 'confirmed' : 'matched'}
        </Heading>
        <Card variant="outline" width="100%">
          <Flex
            direction="column"
            align="center"
            justify="center"
            p="32px"
            gap="16px"
          >
            <Text>name: Bob</Text>
            <Text>phone number: 123-456-7890</Text>
            <Text>instagram: bobofficial</Text>
            <Text>dietary restrictions: vegan</Text>
            <Text>location: Lazeez</Text>
            <Text>time: Feb 23</Text>
            <Flex mt="16px" gap="16px">
              {confirmed ? (
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={() => setConfirmed(false)}
                >
                  cancel
                </Button>
              ) : (
                <Button
                  variant="filled"
                  colorScheme="green"
                  onClick={() => setConfirmed(true)}
                >
                  confirm
                </Button>
              )}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default MatchPage;
