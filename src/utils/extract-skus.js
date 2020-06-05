export function extractSkus(acc, current) {
  console.log(current.variants);
  if (current.variants) {
    const skus = current.variants.map((v) => v.sku);
    console.log(skus);
    return skus;
  }
  return acc;
}
