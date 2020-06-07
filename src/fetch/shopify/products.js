import { fetch } from "./index";

export function buildApiUrl(resource = "/products") {
  return `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_HOST_NAME}/admin/api/2020-04${resource}`;
}

export async function getProducts() {
  const url = buildApiUrl("/products.json?limit=250");
  return fetch(url);
}

export async function getProductCount() {
  const url = buildApiUrl("/products/count.json");
  return fetch(url);
}

export async function getProductVariants() {
  const url = buildApiUrl("/variants.json?limit=250");
  return fetch(url);
}

export async function getProductVariantCount() {
  const url = buildApiUrl("/variants/count.json");
  return fetch(url);
}
