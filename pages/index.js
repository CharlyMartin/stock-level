// Packages
import { Box } from "@chakra-ui/core";

// Components
import ProductList from "../src/components/product-list";
import Header from "../src/components/header";
import Theme from "../src/components/theme";

export default function Index() {
  return (
    <Theme>
      <Box width={[1280]} mx="auto" style={{ position: "relative" }}>
        <Header />
        <ProductList />
      </Box>
    </Theme>
  );
}
