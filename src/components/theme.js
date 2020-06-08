import React from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";

export default function Theme(props) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box as="main" px={8} pb={32} bg="pink.50" minHeight="100vh">
        {props.children}
      </Box>
    </ThemeProvider>
  );
}
