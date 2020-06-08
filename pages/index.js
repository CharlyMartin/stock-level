// Packages
import useSwr from "swr";
import { Box } from "@chakra-ui/core";

// Components
import ProductList from "../src/components/product-list";
import Header from "../src/components/header";
import Theme from "../src/components/theme";

// Fetch
import { fetcher } from "../src/fetch";

function Index() {
  const { error, data } = useSwr("/api/products/count", fetcher);
  console.log(data);

  return (
    <Box width={[1280]} mx="auto" style={{ position: "relative" }}>
      <Header />
      <ProductList />
    </Box>
  );
}

export default (props) => (
  <Theme>
    <Index {...props} />
  </Theme>
);
