import React, { useContext } from 'react';
import { Flex, Image, Button } from '@chakra-ui/react';
import plateImage from '../assets/plate.png';

import AuthContext from '../contexts/AuthContext';

const Menu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Flex w="100%" h="64px" p="16px" align="center" justify="space-between">
      <Image src={plateImage} alt="Noodles" h="40px" />
      <Button variant="outline" onClick={logout}>
        sign out
      </Button>
    </Flex>
  );
};

export default Menu;
