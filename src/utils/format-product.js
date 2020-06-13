export function formatProducts(products = []) {
  const final = [];

  for (const product of products) {
    const { title: productTitle, variants } = product;
    for (const variant of variants) {
      const {
        title: variantTitle,
        price,
        sku,
        inventory_item_id,
        inventory_quantity,
      } = variant;
      if (sku) {
        final.push({
          productTitle,
          variantTitle,
          sku,
          price,
          inventoryId: inventory_item_id,
          quantity: inventory_quantity,
        });
      }
    }
  }
  return final;
}
