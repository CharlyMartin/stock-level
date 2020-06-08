// Fetch
import { buildApiUrl } from "../../../src/fetch/shopify";
import { fetchJSON } from "../../../src/fetch";

// Utils
import { parseLinkHeader } from "../../../src/utils/parse-link-header";
import { filterBySkus } from "../../../src/utils/filter-by-skus";
import { formatProducts } from "../../../src/utils/format-product";

const fetchAllProducts = async (url, products = []) => {
  const { meta, data, headers } = await fetchJSON(url);
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
  const formatedProducts = formatProducts(products);
  res.status(200).json(formatedProducts);
}
