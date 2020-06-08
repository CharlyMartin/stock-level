import { getStockLevel } from "../../../src/fetch/eldorado";

export default async function handler(req, res) {
  const { query } = req;
  const { sku } = query;

  const { meta, data } = await getStockLevel(sku);
  res.status(200).json({ stock: data.quantity.amount._text });
}
