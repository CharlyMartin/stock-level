// Packages
import { js2xml } from "xml-js";

import { fetchXML } from "./index";

export async function getStockLevel(sku) {
  const url = process.env.ELDORADO_STOCK_URL;

  const payload = {
    key: process.env.ELDORADO_STORE_KEY,
    item: sku,
  };

  return await fetchXML(url, {
    method: "POST",
    body: js2xml(payload, { compact: true }),
  });
}
