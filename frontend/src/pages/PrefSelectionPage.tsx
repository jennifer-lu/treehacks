import React, { useContext, useState } from 'react';
import { Flex, Heading, Image, Button, Text } from '@chakra-ui/react';
import kebabImage from '../assets/kebab.png';
import ramenImage from '../assets/ramen.png';
import olivesImage from '../assets/olives.png';
import saladImage from '../assets/salad.png';
import curryImage from '../assets/curry.png';
import shawarmaImage from '../assets/shawarma.png';
import dumplingsImage from '../assets/dumplings.png';
import burgerImage from '../assets/burger.png';
import poutineImage from '../assets/poutine.png';
import icecreamImage from '../assets/icecream.png';

import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Menu from '../components/Menu';

interface PrefSelectionProps {
  index: number;
  incrementIndex: () => void;
}

const foods = [
  { name: 'kebab', image: kebabImage },
  { name: 'ramen', image: ramenImage },
  { name: 'olives', image: olivesImage },
  { name: 'salad', image: saladImage },
  { name: 'curry', image: curryImage },
  { name: 'shawarma', image: shawarmaImage },
  { name: 'dumplings', image: dumplingsImage },
  { name: 'burger', image: burgerImage },
  { name: 'poutine', image: poutineImage },
  { name: 'icecream', image: icecreamImage },
];

export const PrefSelection = ({
  index,
  incrementIndex,
}: PrefSelectionProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [prefs, setPrefs] = useState<number[]>([]);

  const indicateLike = () => {
    setPrefs([...prefs, 1]);
    incrementIndex();
  };

  const indicateDislike = () => {
    setPrefs([...prefs, 0]);
    incrementIndex();
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Flex direction="column" align="center" justify="center" gap="32px">
      <Text>{foods[index].name}</Text>
      <Image src={foods[index].image} height="100px" />
      <Flex gap="16px">
        <Button variant="outline" onClick={indicateDislike}>
          dislike
        </Button>
        <Button variant="filled" onClick={indicateLike}>
          like
        </Button>
      </Flex>
    </Flex>
  );
};

export const PrefSelectionPage = () => {
  const [index, setIndex] = useState(0);
  const hasPrefs = false;

  const incrementIndex = () => {
    setIndex(index + 1);
  };

  if (hasPrefs) {
    return <Navigate to="/match" replace />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Menu />
      <Flex direction="column" align="center" justify="center" p="32px">
        <Text>select your</Text>
        <Heading size="2xl" mb="32px">
          preferences
        </Heading>
        {index < foods.length ? (
          <PrefSelection index={index} incrementIndex={incrementIndex} />
        ) : (
          <Flex direction="column" align="center" justify="center" gap="32px">
            <Text>thank you for indicating your preferences!</Text>
            <Button variant="outline">submit</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
