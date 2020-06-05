// Requests
import { getProducts } from "../../../..//src/fetch/shopify/products";

export default async function handler(req, res) {
  const { meta, data } = await getProducts();
  // If error, ping Slack
  if (meta.statusCode == 200) {
    return res.status(meta.statusCode).json({ ...data });
  }
}
