// Packages
import isomorphicFetch from "isomorphic-fetch";
import { xml2js } from "xml-js";

async function formatXMLData(response) {
  const { status, statusText } = response;
  const textData = await response.text();
  const data = xml2js(textData, { compact: true });
  const resp = { data, meta: { statusCode: status, statusText } };
  return resp;
}

export async function fetch(url, options = {}) {
  const defaults = {
    headers: {
      "Content-Type": "application/xml",
      Accept: "*/*",
      Connection: "keep-alive",
    },
  };
  const fullOptions = { ...defaults, ...options };

  return isomorphicFetch(url, fullOptions).then(formatXMLData);
}
