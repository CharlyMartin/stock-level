import { fetch } from "./index";

export async function getProducts() {
  return fetch("products");
}
