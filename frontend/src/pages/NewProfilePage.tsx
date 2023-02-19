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

const NewProfilePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const hasProfile = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (hasProfile) {
    return <Navigate to="/match" replace />;
  }

  return (
    <Flex direction="column">
      <Menu></Menu>
      <Flex direction="column" align="center" h="100vh" p="32px">
        <Text>create your</Text>
        <Heading size="2xl" mb="32px">
          profile
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
              <FormLabel>name</FormLabel>
              <Input type="email" focusBorderColor="green.600" />
            </FormControl>
            <FormControl>
              <FormLabel>phone number</FormLabel>
              <Input type="tel" focusBorderColor="green.600" />
            </FormControl>
            <FormControl>
              <FormLabel>instagram</FormLabel>
              <Input type="text" focusBorderColor="green.600" />
            </FormControl>
            <FormControl>
              <FormLabel>dietary restrictions</FormLabel>
              <Select
                isMulti
                options={options}
                placeholder=""
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    background: '#C6F6D5',
                    borderRadius: '5px',
                    borderColor: '#2F855A',
                    boxShadow: 'none',
                    outline: state.isFocused ? '1px solid #2F855A' : 'none',
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    background: '#C6F6D5',
                    border: '1px solid',
                    borderRadius: '5px',
                    borderColor: '#2F855A',
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    borderRadius: '5px',
                  }),
                  multiValue: (baseStyles) => ({
                    ...baseStyles,
                    border: '1px solid',
                    borderRadius: '5px',
                    backgroundColor: '#C6F6D5',
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? '#2F855A' : '#C6F6D5',
                    color: state.isFocused ? '#C6F6D5' : '#2F855A',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#2F855A',
                  }),
                  clearIndicator: (baseStyles) => ({
                    ...baseStyles,
                    display: 'none',
                  }),
                  indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    display: 'none',
                  }),
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: '#2F855A',
                  }),
                  multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: '#2F855A',
                  }),
                }}
              />
            </FormControl>
            <Flex mt="16px" gap="16px">
              <Button variant="filled" colorScheme="green">
                create
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default NewProfilePage;
