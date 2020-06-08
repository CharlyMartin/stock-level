export function formatProducts(products = []) {
  const final = [];

  for (const product of products) {
    const { title: productTitle, variants } = product;
    for (const variant of variants) {
      const { title: variantTitle, price, sku } = variant;
      if (sku) {
        final.push({
          productTitle,
          variantTitle,
          sku,
          price,
        });
      }
    }
  }
  return final;
}
