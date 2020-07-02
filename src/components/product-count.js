// Packages
import { Stack, Badge } from "@chakra-ui/core";

export default function ProductCount(props) {
  const { skuCount, productCount, variantCount } = props;

  return (
    <Stack isInline spacing={2} align="center" mt={2}>
      <Badge bg="pink.50" color="pink.700" fontSize="sm">
        ON SHOPIFY
      </Badge>
      <Badge bg="pink.600" color="white" fontSize="sm">
        {productCount} PRODUCTS
      </Badge>
      <Badge bg="teal.600" color="white" fontSize="sm">
        {variantCount} VARIANTS
      </Badge>
      <Badge bg="cyan.600" color="white" fontSize="sm">
        {skuCount} SKUS
      </Badge>
    </Stack>
  );
}
