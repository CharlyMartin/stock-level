// Packages
import { useState } from "react";
import { Heading, Flex, Box, Input, Button, Stack } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { useToast } from "@chakra-ui/core";

// Components
import ProductCount from "./product-count";

// Fetch
import { fetchJSON } from "../fetch/index";

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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event) => setValue(event.target.value);

  const updateStock = async () => {
    setIsLoading(true);
    const { meta } = await fetchJSON("/api/stocks/update");

    if (meta.statusCode == 200) {
      toast({
        title: "Stock Updated",
        description:
          "Babs, your stock on Shopify was updated with Eldorado's latest data",
        status: "success",
        isClosable: true,
        duration: 9000,
        position: "top-right",
      });
    }
    setIsLoading(false);
  };

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
          <Button onClick={() => setSearch(value)}>Search</Button>
        </Stack>
        <Button variantColor="pink" isLoading={isLoading} onClick={updateStock}>
          Update Stock on Shopify
        </Button>
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
