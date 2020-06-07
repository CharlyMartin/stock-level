import { fetch } from "./index";

export function buildApiUrl(resource = "/products") {
  return `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_HOST_NAME}/admin/api/2020-04${resource}`;
  // return "https://99c416756503db5e8eb9314c2bcef30d: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@hey-lola-store.myshopify.com/admin/api/2020-04/products.json";
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
