export function filterBySkus(products) {
  return products
    .filter((product) => product.variants.length)
    .filter((product) => product.variants.some((v) => v.sku));
}
