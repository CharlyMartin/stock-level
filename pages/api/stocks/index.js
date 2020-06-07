import { getStockLevel } from "../../../src/fetch/eldoraro/stocks";
import { fetch } from "../../../src/fetch/shopify";

export default async function handler(req, res) {
  const { meta, data: products } = await fetch(
    process.env.APP_URL + "/api/products"
  );

  const final = [];

  for (const product of products) {
    const { title: productTitle, variants, images } = product;
    for (const variant of variants) {
      const { title: variantTitle, price, sku } = variant;
      if (sku) {
        const { meta, data } = await getStockLevel(variant.sku);
        console.log(sku, data.quantity.amount._text);
        // If Eldorado Error, ping Slack
        if (meta.statusCode == 200) {
          final.push({
            productTitle,
            variantTitle,
            sku,
            price,
            image: images[0],
            stock: data.quantity.amount._text,
          });
        }
      }
    }
  }

  res.status(200).json(final);
}
