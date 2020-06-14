// Packages
import useSwr from "swr";
import { Spinner, Badge } from "@chakra-ui/core";

// Fetch
import { fetcher } from "../fetch";

// Utils
import { delay } from "../utils/delay";

export default function ProductStock({ quantity, position = 0, ...rest }) {
  // const { error, data } = useSwr(
  //   "/api/stocks/" + sku,
  //   (url) => delay(url, position * 500).then(fetcher),
  //   { revalidateOnMount: false, revalidateOnFocus: false }
  // );

  // if (error || !data) return <Spinner size="xs" color="pink.500" />;

  const styles = {
    in: { bg: "green.500", color: "white", fontSize: "md" },
    out: { bg: "red.500", color: "white", fontSize: "md" },
    wrong: { bg: "gray.600", color: "white" },
  };

  const getData = () => {
    if (quantity == -1) return "Wrong SKU";
    return quantity;
  };

  const getStyle = () => {
    if (Number(quantity) > 1) return styles["in"];
    if (Number(quantity) == -1) return styles["wrong"];
    return styles["out"];
  };

  return (
    <Badge {...rest} {...getStyle()} width="auto">
      {getData()}
    </Badge>
  );
}
