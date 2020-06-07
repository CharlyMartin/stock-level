// Packages
import useSwr from "swr";

// Fetch
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { error, data } = useSwr("/api/stocks", fetcher);

  if (error) {
    console.log(error);
    return <div>Failed to load stock levels</div>;
  }

  if (!data) return <div>Loading...</div>;

  const style = { margin: "4px 64px 4px 0" };

  return (
    <div style={{ padding: "16px 64px" }}>
      <table style={{ textAlign: "left" }}>
        <h2>Babs Products: {data.count}</h2>
        <tr>
          <th>Product</th>
          <th>Variant</th>
          <th>SKU</th>
          <th>Stock</th>
        </tr>
        {data.products.map((product) => (
          <tr>
            <td>
              <p style={style}> {product.productTitle}</p>
            </td>
            <td>
              <p style={style}> {product.variantTitle}</p>
            </td>
            <td>
              <p style={style}> {product.sku}</p>
            </td>
            <td>
              <p
                style={{
                  ...style,
                  color: Number(product.stock) > 5 ? "green" : "red",
                }}
              >
                {product.stock}
              </p>
            </td>
          </tr>
        ))}
      </table>
      <i>
        <p>BJ Count: 20</p>
      </i>
    </div>
  );
}
