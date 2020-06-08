// Packages
import useSwr from "swr";
import { Spinner, Badge } from "@chakra-ui/core";

// Fetch
import { fetcher } from "../fetch";

export default function Product({ sku, ...rest }) {
  const { error, data } = useSwr("/api/stocks/" + sku, fetcher);
  if (error || !data) return <Spinner size="xs" color="pink.500" />;

  const styles = {
    in: { bg: "green.500", color: "white", fontSize: "md" },
    out: { bg: "red.500", color: "white", fontSize: "md" },
    wrong: { bg: "gray.600", color: "white" },
  };

  const getData = () => {
    if (data.stock == "-1") return "Wrong SKU";
    return data.stock;
  };

  const getStyle = () => {
    if (Number(data.stock) > 1) return styles["in"];
    if (Number(data.stock) == -1) return styles["wrong"];
    return styles["out"];
  };

  return (
    <Badge {...rest} {...getStyle()} width="auto">
      {getData()}
    </Badge>
  );
}
