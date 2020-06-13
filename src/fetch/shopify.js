import { fetchJSON } from "./index";

export function buildApiUrl(resource = "/products") {
  return `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_HOST_NAME}/admin/api/2020-04${resource}`;
}

export async function getProducts() {
  const url = buildApiUrl("/products.json?limit=250");
  return fetchJSON(url);
}

export async function getProductCount() {
  const url = buildApiUrl("/products/count.json");
  return fetchJSON(url);
}

export async function getProductVariants() {
  const url = buildApiUrl("/variants.json?limit=250");
  return fetchJSON(url);
}

export async function getProductVariantCount() {
  const url = buildApiUrl("/variants/count.json");
  return fetchJSON(url);
}

export async function getLocations() {
  const url = buildApiUrl("/locations.json");
  return fetchJSON(url);
}

export async function setInventoryLevel(payload) {
  const url = buildApiUrl("/inventory_levels/set.json");
  // {
  //   "location_id": 905684977,
  //   "inventory_item_id": 808950810,
  //   "available": 42
  // }
  return fetchJSON(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
