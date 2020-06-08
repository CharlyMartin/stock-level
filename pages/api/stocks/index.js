// Fetch
import { getStockLevel } from "../../../src/fetch/eldorado";
import { fetchJSON } from "../../../src/fetch/shopify";

export default async function handler(req, res) {
  const { meta, data: products } = await fetchJSON(
    process.env.APP_URL + "/api/products"
  );

  const final = [];

  for (const product of products) {
    for (const variant of product.variants) {
      const { meta, data } = await getStockLevel(variant.sku);
      // If Eldorado Error, ping Slack
      if (meta.statusCode == 200) {
        final.push({
          ...product,
          stock: data.quantity.amount._text,
        });
      }
    }
  }

  res.status(200).json(final);
}
