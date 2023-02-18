import React from 'react';
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Image,
  Spacer,
  Card,
  Button,
  Text,
} from '@chakra-ui/react';
import plateImage from '../assets/plate.png';

const Menu = () => {
  return (
    <Flex w="100%" h="64px" p="16px" align="center" justify="space-between">
      <Image src={plateImage} alt="Noodles" h="40px" />
      <Button variant="outline">sign out</Button>
    </Flex>
  );
};

export default Menu;
