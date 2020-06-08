// Packages
import useSwr from "swr";
import { Flex, Box, Spinner, Text } from "@chakra-ui/core";

// Components
import Product from "./product";

// Fetch
import { fetcher } from "../fetch";

export default function ProductList() {
  const { error, data } = useSwr("/api/products", fetcher);

  if (error) return <Text>Failed to load stock levels</Text>;
  if (!data)
    return (
      <Flex height={200} justify="center" align="center">
        <Spinner color="pink.500" />
      </Flex>
    );

  return (
    <Box>
      {data.map((product, index) => (
        <Product data={product} position={index} />
      ))}
      <Text textAlign="center" py={1} bg="pink.100">
        That's all
      </Text>
    </Box>
  );
}
