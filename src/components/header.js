// Packages
import { useState } from "react";
import { Heading, Flex, Box, Input, Button, Stack } from "@chakra-ui/core";
import styled from "@emotion/styled";

// Components
import ProductCount from "./product-count";

const StickyHeader = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ListHeading = ({ children, size }) => (
  <Heading as="h3" size="md" color="pink.500" flexBasis={size}>
    {children}
  </Heading>
);

export default function Header({ products, setSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => setValue(event.target.value);

  return (
    <StickyHeader as="header" bg="pink.50" pt={8}>
      <Heading as="h1" size="2xl" color="pink.900">
        The Stock of Babs
      </Heading>
      <Flex justify="space-between" align="center">
        <ProductCount skuCount={products.length} />
        <Stack isInline>
          <Input
            width={200}
            focusBorderColor="pink.200"
            placeholder="Womanizer"
            border="md"
            onChange={handleChange}
          />
          <Button variantColor="pink" onClick={() => setSearch(value)}>
            Search
          </Button>
        </Stack>
      </Flex>
      <Flex pb={2} pt={8} borderBottomColor="pink.900" borderBottomWidth={1}>
        <ListHeading size="50%">Products</ListHeading>
        <ListHeading size="20%">Variant</ListHeading>
        <ListHeading size="20%">SKU</ListHeading>
        <ListHeading size="10%">Stock</ListHeading>
      </Flex>
    </StickyHeader>
  );
}
