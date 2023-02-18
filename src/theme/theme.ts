import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";

const theme = extendTheme({
  colors,
  components: {
    Button,
    Card,
    Input,
  },
  fonts: {
    body: `"Helvetica Neue"`,
    heading: `"Helvetica Neue"`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "green.100",
        color: "green.600",
      },
    },
  },
});

export default theme;
