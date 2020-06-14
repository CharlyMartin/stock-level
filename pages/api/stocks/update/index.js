// Fetch
import { getStockLevel } from "../../../../src/fetch/eldorado";
import {
  getLocations,
  setInventoryLevel,
  getApiProducts,
} from "../../../../src/fetch/shopify";
import { postSlackMessage } from "../../../../src/fetch/slack";

export default async function handler(req, res) {
  const { data: products } = await getApiProducts();
  const { data: locations } = await getLocations();
  const locationId = locations.locations[0].id;

  let count = 0;
  postSlackMessage({ title: "Update Starts", text: "Update Starts" });

  for (const product of products) {
    const { sku, inventoryId } = product;
    count++;

    if (sku && inventoryId) {
      const { meta: s, data: stock } = await getStockLevel(sku);
      const stockLevel = Number(stock.quantity.amount._text);

      if (stockLevel != -1) {
        // Update Shopify
        const { meta: i } = await setInventoryLevel({
          location_id: locationId,
          inventory_item_id: inventoryId,
          available: stockLevel,
        });
        // postSlackMessage({
        //   title: count + " - " + sku + " - Stock: " + stockLevel,
        //   text: "Eldoraro: " + s.statusText + " - Shopify: " + i.statusText,
        // });
      }
    }
  }

  // postSlackMessage({ title: "Update Done", text: "Update Done" });
  res.status(200).json({ status: 200, text: "Done" });
}
