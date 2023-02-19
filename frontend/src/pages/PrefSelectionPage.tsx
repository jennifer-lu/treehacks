import React, { useEffect, useState } from 'react';
import { Flex, Heading, Image, Button, Text, Card } from '@chakra-ui/react';

interface PrefSelectionProps {
  index: number;
  incrementIndex: () => void;
}

const foodNames = [
  'kebab, ramen, olives',
  'salad',
  'curry',
  'shawarma',
  'sushi',
  'fish n chips',
  'poutine',
  'beer',
];

export const PrefSelection = ({
  index,
  incrementIndex,
}: PrefSelectionProps) => {
  const [prefs, setPrefs] = useState<number[]>([]);

  const indicateLike = () => {
    setPrefs([...prefs, 1]);
    incrementIndex();
  };

  const indicateDislike = () => {
    setPrefs([...prefs, 0]);
    incrementIndex();
  };

  return (
    <Card>
      <Text>{foodNames[index]}</Text>
      <Flex direction="row" justify="center">
        <Button onClick={indicateLike}>Like</Button>
        <Button onClick={indicateDislike}>Dislike</Button>
      </Flex>
    </Card>
  );
};

export const PrefSelectionPage = () => {
  const [index, setIndex] = useState(0);

  const incrementIndex = () => {
    setIndex(index + 1);
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh" p="32px">
      <Heading>Food Preferences</Heading>
      {index < foodNames.length ? (
        <PrefSelection index={index} incrementIndex={incrementIndex} />
      ) : (
        <div>
          <Text>Thank you for indicating your preferences!</Text>
          <Button>Submit Preferences</Button>
        </div>
      )}
    </Flex>
  );
};
