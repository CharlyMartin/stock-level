import useSwr from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data: products, error } = useSwr("/api/stocks", fetcher);

  if (error) return <div>Failed to load stock levels</div>;
  if (!products) return <div>Loading...</div>;
  // console.log(data);

  return (
    <div>
      <table style={{ textAlign: "left" }}>
        <h2>Babs Stocks</h2>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Stock</th>
        </tr>
        {products.map((product) => (
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
