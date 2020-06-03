// Fetch
import { fetch } from "./index";
import { js2xml } from "xml-js";

export async function getStockLevel(sku) {
  const url = process.env.STOCK_LEVEL_URL;

  const payload = {
    key: process.env.STORE_KEY,
    item: sku,
  };

  return await fetch(url, {
    method: "POST",
    body: js2xml(payload, { compact: true }),
  });
}
