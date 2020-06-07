export function extractSkus(products) {
  return (
    products
      // 1. Remove products with no variants
      .filter((product) => product.variants.length)
      // 2. Keep only necessary info
      .map((product) => {
        const { title, image, variants } = product;
        return { name: title, image, variants };
      })
      // 3. Keep products with at least one variant with an sku
      .filter((product) => product.variants.some((v) => v.sku))
      // 4. Keep only necessary variant info
      .map((product) => {
        const skus = product.variants.map((variant) => {
          if (variant.sku) return { sku: variant.sku, name: variant.option1 };
        });
        return { ...product, variants: skus };
      })
  );
}
