import useSwr from "swr";
// import Link from "next/link";

import { extractSkus } from "../src/utils/extract-skus";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data } = useSwr("/api/shopify/products", fetcher);
  const { data: stocks, error } = useSwr("/api/eldorado/stocks", fetcher);

  if (error) return <div>Failed to load stock levels</div>;
  if (!stocks || !data) return <div>Loading...</div>;

  const skus = data.products
    .filter((product) => product.variants.length)
    .filter((product) => product.variants.find((v) => v.sku));

  console.log(skus);

  return (
    <div>
      <table style={{ textAlign: "left" }}>
        <h2>Babs Stocks</h2>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Stock</th>
        </tr>
        {stocks.map((product) => (
          <tr>
            <td>
              <p style={{ margin: "4px", marginRight: "32px" }}>
                {product.name}
              </p>
            </td>
            <td>
              <p style={{ margin: "4px", marginRight: "32px" }}>
                {" "}
                {product.sku}
              </p>
            </td>
            <td>
              <p style={{ margin: "4px", marginRight: "32px" }}>
                {product.stock}
              </p>
            </td>
          </tr>
        ))}
      </table>
      <i>
        <p>BJ Count: 3</p>
      </i>
    </div>
  );
}
