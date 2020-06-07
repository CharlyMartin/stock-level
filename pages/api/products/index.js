// Fetch
import { buildApiUrl } from "../../../src/fetch/shopify/products";
import { fetch } from "../../../src/fetch/shopify";

// Utils
import { parseLinkHeader } from "../../../src/utils/parse-link-header";
import { filterBySkus } from "../../../src/utils/filter-by-skus";

const fetchAllProducts = async (url, products = []) => {
  const { meta, data, headers } = await fetch(url);
  // If Shopify Error, ping Slack
  const allProducts = [...products, ...data.products];
  const pagination = parseLinkHeader(headers._headers.link[0]);

  if (pagination.next && pagination.next.search) {
    const baseUrl = buildApiUrl("/products.json");
    const fullUrl = baseUrl + pagination.next.search;
    return await fetchAllProducts(fullUrl, allProducts);
  }

  return allProducts;
};

export default async function handler(req, res) {
  const initialUrl = buildApiUrl("/products.json");
  const data = await fetchAllProducts(initialUrl);
  const products = filterBySkus(data);
  const final = [];

  for (const product of products) {
    const { title: productTitle, variants } = product;
    for (const variant of variants) {
      const { title: variantTitle, price, sku } = variant;
      if (sku) {
        // If Eldorado Error, ping Slack
        final.push({
          productTitle,
          variantTitle,
          sku,
          price,
        });
      }
    }
  }
  res.status(200).json(final);
}
