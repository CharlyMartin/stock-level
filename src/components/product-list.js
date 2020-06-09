// Packages
import { Box, Text } from "@chakra-ui/core";

// Components
import Product from "./product";

export default function ProductList({ products }) {
  return (
    <Box>
      {products.map((product, i) => (
        <Product data={product} position={i} key={i} />
      ))}
      <Text textAlign="center" py={1} bg="pink.100">
        That's all
      </Text>
    </Box>
  );
}
