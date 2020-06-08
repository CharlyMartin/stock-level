import React from "react";
import { ThemeProvider } from "@chakra-ui/core";

export default function Theme(props) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}
