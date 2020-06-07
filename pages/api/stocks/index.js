// Packages

// Fetch
import { getStockLevel } from "../../../src/fetch/eldoraro/stocks";
import {
  buildApiUrl,
  getProducts,
  getProductCount,
} from "../../../src/fetch/shopify/products";
import { fetch } from "../../../src/fetch/shopify";

// Utils
import { filterBySkus } from "../../../src/utils/filter-by-skus";
import { parseLinkHeader } from "../../../src/utils/parse-link-header";

// Create a recursive function for links
// link: [
//   '<https://hey-lola-store.myshopify.com/admin/api/2020-04/variants.json?limit=200&page_info=eyJsYXN0X2lkIjozMDA5ODI2NTE3ODE3NiwibGFzdF92YWx1ZSI6IjMwMDk4MjY1MTc4MTc2IiwiZGlyZWN0aW9uIjoibmV4dCJ9>; rel="next"'
// ],

const fetchAllProducts = async (url, products = []) => {
  const { meta, data, headers } = await fetch(url);
  const allProducts = [...products, ...data.products];
  const pagination = parseLinkHeader(headers._headers.link[0]);

  if (pagination.next && pagination.next.search) {
    const baseUrl = buildApiUrl("/products.json");
    const fullUrl = baseUrl + pagination.next.search;
    return await fetchAllProducts(fullUrl, allProducts);
  }

  return allProducts;
};

export default async function handler(req, res) {
  const initialUrl = buildApiUrl("/products.json");
  const test = await fetchAllProducts(initialUrl);
  console.log(test.length);

  // const { meta, data, headers } = await getProducts();
  // const { data: count } = await getProductCount();
  // // If Shopify Error, ping Slack

  // const products = filterBySkus(data.products);

  // const final = [];

  // for (const product of products) {
  //   const { title: productTitle, variants, images } = product;
  //   for (const variant of variants) {
  //     const { title: variantTitle, price, sku } = variant;
  //     const { meta, data } = await getStockLevel(variant.sku);
  //     // If Eldorado Error, ping Slack
  //     if (meta.statusCode == 200) {
  //       final.push({
  //         productTitle,
  //         variantTitle,
  //         sku,
  //         price,
  //         image: images[0],
  //         stock: data.quantity.amount._text,
  //       });
  //     }
  //   }
  // }

  // res.status(200).json({
  //   count: count.count,
  //   products: final,
  // });
  res.status(200).json([]);
}

// const { meta, data } = await getProducts();
// const products = extractSkus(data.products);
// console.log(products);

// const final = [];
// for (const product of products) {
//   for (const variant of product.variants) {
//     const { meta, data } = await getStockLevel(variant.sku);
//     // If Eldorado Error, ping Slack
//     if (meta.statusCode == 200) {
//       final.push({
//         productName: product.name,
//         variantName: variant.name,
//         sku: variant.sku,
//         stock: data.quantity.amount._text,
//       });
//     }
//   }
// }

// VARIANTS
// const variants = data.variants
//   .filter((variant) => variant.sku)
//   .map((variant) => {
//     const { title, price, sku, product_id, image_id } = variant;
//     return { title, price, sku };
//   });

// const final = [];
// for (const variant of variants) {
//   const { meta, data } = await getStockLevel(variant.sku);
//   // If Eldorado Error, ping Slack
//   final.push({ ...variant, stock: data.quantity.amount._text });
// }

// res.status(200).json({
//   count: count.count,
//   products: final,
// });
