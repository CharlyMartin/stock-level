// Fetch
import { getStockLevel } from "../../../../src/fetch/eldoraro/stocks";

// Fake users data
const products = [
  { name: "Womanizer Premium - Black/Gold", sku: "EPI609036" },
  { name: "Womanizer Duo - Bordeaux", sku: "WVWZ07CI9600" },
  { name: "We-Vibe Chorus - Blue", sku: "WVSNW6SG5" },
];

export default async function handler(req, res) {
  const levels = [];

  for (const product of products) {
    const { meta, data } = await getStockLevel(product.sku);
    if (meta.statusCode == 200) {
      levels.push({ ...product, stock: data.quantity.amount._text });
    }
  }

  res.status(200).json(levels);
}
