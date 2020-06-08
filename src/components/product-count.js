// Packages
import useSwr from "swr";
import { Badge } from "@chakra-ui/core";

// Fetch
import { fetcher } from "../fetch";

export default function ProductCount() {
  const { error, data } = useSwr("/api/products/count", fetcher);
  if (error || !data) return null;

  return (
    <Badge bg="pink.700" color="white" fontSize="sm">
      {data.count} PRODUCTS
    </Badge>
  );
}
