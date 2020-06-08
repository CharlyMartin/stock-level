// Fetch
import { getProductCount } from "../../../src/fetch/shopify";

export default async function handler(req, res) {
  const { meta, data } = await getProductCount();
  console.log(data);
  res.status(200).json(data);
}
