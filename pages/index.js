// Packages
import useSwr from "swr";

// Components
import Product from "../src/components/product";

// Fetch
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { error, data } = useSwr("/api/products", fetcher);

  if (error) return <div>Failed to load stock levels</div>;

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: "16px 64px" }}>
      <table style={{ textAlign: "left" }}>
        <h2>The stock of Babs</h2>
        <tr>
          <th>Product</th>
          <th>Variant</th>
          <th>SKU</th>
          <th>Stock</th>
        </tr>
        {data.map((product) => (
          <Product data={product} />
        ))}
      </table>
      <i>
        <p>BJ Count: 20</p>
      </i>
    </div>
  );
}
