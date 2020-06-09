// Packages
import useSwr from "swr";
import { Spinner, Badge } from "@chakra-ui/core";

// Fetch
import { fetcher } from "../fetch";

// Utils
import { delay } from "../utils/delay";

export default function ProductStock({ sku, position = 0, ...rest }) {
  const url = "/api/stocks/" + sku;
  const { error, data } = useSwr(url, (url) =>
    delay(url, position * 400).then(fetcher)
  );

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
