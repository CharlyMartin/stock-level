// Packages
import isomorphicFetch from "isomorphic-fetch";

function buildApiUrl(resource = "products") {
  return `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_HOST_NAME}/admin/api/2020-04/${resource}.json`;
  // return "https://99c416756503db5e8eb9314c2bcef30d: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@hey-lola-store.myshopify.com/admin/api/2020-04/products.json";
}

async function formatResponse(response) {
  const { status, statusText } = response;
  const data = await response.json();
  return { data, meta: { statusCode: status, statusText } };
}

export async function fetch(resource, options = {}) {
  const defaults = {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Connection: "keep-alive",
    },
  };
  const fullOptions = { ...defaults, ...options };
  const url = buildApiUrl(resource);

  return isomorphicFetch(url, fullOptions).then(formatResponse);
}
