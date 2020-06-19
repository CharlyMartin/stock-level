// Fetch
import { getStockLevel } from "../../../../src/fetch/eldorado";
import {
  setInventoryLevel,
  getProductVariant,
  getProductVariants,
  getApiProductVariant,
} from "../../../../src/fetch/shopify";
import { postSlackMessage } from "../../../../src/fetch/slack";

export default async function handler(req, res) {
  const { query } = req;
  const { id, locationId } = query;

  const { data: v } = await getProductVariant(id);
  const { sku, inventory_item_id } = v.variant;

  const { data: s } = await getStockLevel(sku);
  const stockLevel = Number(s.quantity.amount._text);

  if (sku && inventory_item_id) {
    const { meta } = await setInventoryLevel({
      location_id: locationId,
      inventory_item_id,
      available: stockLevel,
    });
    console.log(
      sku + " - Stock: " + stockLevel + " -  Status: " + meta.statusText
    );
    postSlackMessage({
      title: sku,
      text: "Stock: " + stockLevel + " -  Status: " + meta.statusText,
    });
  }

  const { data: next } = await getProductVariants({ sinceId: id });
  const nextVariant = next.variants[0];

  if (nextVariant) getApiProductVariant({ id: nextVariant.id, locationId });
  if (!nextVariant) postSlackMessage({ title: "Done", text: "Update Done" });

  res.status(200).json({ status: 200, text: "Done" });
}
