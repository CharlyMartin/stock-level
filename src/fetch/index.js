// Packages
// import { xml2js } from "xml-js";

export const fetcher = (url) => fetch(url).then((res) => res.json());

async function formatResponse(response) {
  const { status, statusText, headers } = response;
  const data = await response.json();
  return { data, meta: { statusCode: status, statusText }, headers };
}

export async function fetchJSON(url, options = {}) {
  const defaults = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
      Connection: "keep-alive",
    },
  };
  const fullOptions = { ...defaults, ...options };

  return fetch(url, fullOptions).then(formatResponse);
}

// async function formatXMLData(response) {
//   const { status, statusText } = response;
//   const textData = await response.text();
//   const data = xml2js(textData, { compact: true });
//   const resp = { data, meta: { statusCode: status, statusText } };
//   return resp;
// }

// export async function fetchXML(url, options = {}) {
//   const defaults = {
//     headers: {
//       "Content-Type": "application/xml",
//       Accept: "*/*",
//       Connection: "keep-alive",
//     },
//   };
//   const fullOptions = { ...defaults, ...options };

//   return fetch(url, fullOptions).then(formatXMLData);
// }
