// Packages
import isomorphicFetch from "isomorphic-fetch";

async function formatResponse(response) {
  const { status, statusText, headers } = response;
  const data = await response.json();
  return { data, meta: { statusCode: status, statusText }, headers };
}

export async function fetch(url, options = {}) {
  const defaults = {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Connection: "keep-alive",
    },
  };
  const fullOptions = { ...defaults, ...options };

  return isomorphicFetch(url, fullOptions).then(formatResponse);
}
