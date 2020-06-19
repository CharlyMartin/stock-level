// Packages
import React from "react";
import { Flex, Text } from "@chakra-ui/core";

// Component
import ProductStock from "./product-stock";

export default function Product(props) {
  const { data, position } = props;
  const { productTitle, variantTitle, sku, quantity } = data;

  return (
    <Flex p={2} align="center" bg={position % 2 ? "unset" : "white"}>
      <Text flex="0 1 5%">{position + 1}</Text>
      <Text flex="0 1 45%">{productTitle}</Text>
      <Text flex="0 1 20%">{variantTitle}</Text>
      <Text flex="0 1 20%">{sku}</Text>
      <ProductStock quantity={quantity} />
    </Flex>
  );
}
