// Fetch
import {
  getProductVariants,
  getApiProductVariant,
  getLocations,
} from "../../../../src/fetch/shopify";

import { postSlackMessage } from "../../../../src/fetch/slack";

export default async function handler(req, res) {
  postSlackMessage({ title: "Start!", text: "Update Starts" });

  const { data } = await getProductVariants({});
  const firstVariant = data.variants[0];

  const { data: locations } = await getLocations();
  const locationId = locations.locations[0].id;

  getApiProductVariant({ id: firstVariant.id, locationId: locationId });
  res.status(200).json({ status: 200, text: "Done" });
}
