// Fetch
import { getStockLevel } from "../../../src/fetch/eldorado";
import { getLocations, setInventoryLevel } from "../../../src/fetch/shopify";
import { fetchJSON } from "../../../src/fetch";

export default async function handler(req, res) {
  const { data: products } = await fetchJSON(
    process.env.APP_URL + "/api/products"
  );

  const { data: locations } = await getLocations();
  const locationId = locations.locations[0].id;

  for (const product of products) {
    const { sku, inventoryId } = product;

    if (sku && inventoryId) {
      const { data: stock } = await getStockLevel(sku);
      const stockLevel = Number(stock.quantity.amount._text);
      if (stockLevel != -1) {
        // Update Shopify
        const { meta } = await setInventoryLevel({
          location_id: locationId,
          inventory_item_id: inventoryId,
          available: stockLevel,
        });
        console.log("setInventoryLevel", meta);
      }
    }
  }

  res.status(200).json({ status: 200, text: "Done" });
}
