import { extendTheme } from '@chakra-ui/react';

import colors from './colors';

const theme = extendTheme({
  colors,
  fonts: {
    body: `"Helvetica"`,
    heading: `"Helvetica"`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'orange.100',
        color: 'orange.900',
      },
    },
  },
});

export default theme;
