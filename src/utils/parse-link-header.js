// Packages
import url from "url";

function reducer(acc, cur) {
  const pieces = cur.trim().split(";");
  const link = url.parse(pieces[0].trim().slice(1, -1), true);
  const rel = pieces[1].trim().slice(4);

  if (rel === '"next"') acc.next = link;
  else acc.previous = link;

  return acc;
}

export function parseLinkHeader(header) {
  return header.split(",").reduce(reducer, {});
}
