// Fetch
import { getProductVariantCount } from "../../../src/fetch/shopify";

export default async function handler(req, res) {
  const { meta, data } = await getProductVariantCount();
  res.status(200).json(data);
}
