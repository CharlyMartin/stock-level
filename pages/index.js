// Packages
import { useState } from "react";
import useSwr from "swr";
import { Flex, Box, Spinner, Text } from "@chakra-ui/core";

// Components
import ProductList from "../src/components/product-list";
import Header from "../src/components/header";
import Theme from "../src/components/theme";

// Fetch
import { fetcher } from "../src/fetch";

function Index() {
  const { error, data } = useSwr(
    process.env.NEXT_PUBLIC_FETCH_PRODUCTS,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const [search, setSearch] = useState("");

  if (error) return <Text>Failed to load stock levels</Text>;
  if (!data || !data.products) {
    return (
      <Flex height={400} justify="center" align="center">
        <Spinner color="pink.500" />
      </Flex>
    );
  }

  const getData = () => {
    if (search) {
      return data.products.filter((p) => p.productTitle.includes(search));
    }
    return data.products;
  };

  return (
    <Box width={[1280]} mx="auto" style={{ position: "relative" }}>
      <Header products={data.products} setSearch={setSearch} />
      <ProductList products={getData()} />
    </Box>
  );
}

export default () => (
  <Theme>
    <Index />
  </Theme>
);
