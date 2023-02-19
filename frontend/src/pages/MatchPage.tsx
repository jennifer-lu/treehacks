import React, { useContext, useEffect } from 'react';
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

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Flex direction="column">
      <Menu></Menu>
      <Flex direction="column" align="center" h="100vh" p="32px">
        <Text>you&rsquo;ve been</Text>
        <Heading size="2xl" mb="32px">
          matched
        </Heading>
        <Card variant="outline" width="100%">
          <Flex
            direction="column"
            align="center"
            justify="center"
            p="32px"
            gap="16px"
          >
            <Text>name: </Text>
            <Text>phone number: </Text>
            <Text>instagram: </Text>
            <Text>dietary restrictions: </Text>
            <Text>location: </Text>
            <Text>time: </Text>
            <Flex mt="16px" gap="16px">
              <Button variant="outline" colorScheme="green">
                cancel
              </Button>
              <Button variant="filled" colorScheme="green">
                confirm
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default MatchPage;
