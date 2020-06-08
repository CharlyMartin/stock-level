// Packages
import { Heading, Flex, Box } from "@chakra-ui/core";
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

export default function Header() {
  return (
    <StickyHeader as="header" bg="pink.50" pt={8}>
      <Heading as="h1" size="2xl" color="pink.900">
        The Stock of Babs
      </Heading>
      <ProductCount />
      <Flex pb={2} pt={8} borderBottomColor="pink.900" borderBottomWidth={1}>
        <ListHeading size="50%">Products</ListHeading>
        <ListHeading size="20%">Variant</ListHeading>
        <ListHeading size="20%">SKU</ListHeading>
        <ListHeading size="10%">Stock</ListHeading>
      </Flex>
    </StickyHeader>
  );
}
