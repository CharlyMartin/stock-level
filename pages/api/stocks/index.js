// Fetch
import { getStockLevel } from "../../../src/fetch/eldoraro/stocks";
import { getProducts } from "../../../src/fetch/shopify/products";

// Utils
import { extractSkus } from "../../../src/utils/extract-skus";

export default async function handler(req, res) {
  const { meta, data } = await getProducts();
  // If Shopify Error, ping Slack

  const products = extractSkus(data.products);
  // console.log(products);

  const final = [];

  for (const product of products) {
    for (const variant of product.variants) {
      const { meta, data } = await getStockLevel(variant.sku);
      // If Eldorado Error, ping Slack
      if (meta.statusCode == 200) {
        final.push({
          productName: product.name,
          variantName: variant.name,
          sku: variant.sku,
          stock: data.quantity.amount._text,
        });
      }
    }
  }

  res.status(200).json(final);
}
