// Packages
import useSwr from "swr";
import { Stack, Badge } from "@chakra-ui/core";

// Fetch
import { fetcher } from "../fetch";

export default function ProductCount({ skuCount }) {
  const { error: pError, data: pData } = useSwr("/api/products/count", fetcher);
  const { error: vError, data: vData } = useSwr("/api/variants/count", fetcher);

  if (pError || !pData) return null;
  if (vError || !vData) return null;

  return (
    <Stack isInline spacing={2} align="center" mt={2}>
      <Badge bg="pink.50" color="pink.700" fontSize="sm">
        ON SHOPIFY
      </Badge>
      <Badge bg="pink.600" color="white" fontSize="sm">
        {pData.count} PRODUCTS
      </Badge>
      <Badge bg="teal.600" color="white" fontSize="sm">
        {vData.count} VARIANTS
      </Badge>
      <Badge bg="cyan.600" color="white" fontSize="sm">
        {skuCount} SKUS
      </Badge>
    </Stack>
  );
}
