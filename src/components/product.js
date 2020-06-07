// Packages
import React from "react";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Product(props) {
  const { data } = props;
  const { productTitle, variantTitle, sku } = data;

  const { error, data: skuInfo } = useSwr("/api/stocks/" + sku, fetcher);

  if (error) return <p>Error</p>;
  if (!skuInfo) return <div>?</div>;

  const style = { margin: "4px 64px 4px 0" };
  return (
    <tr>
      <td>
        <p style={style}>{productTitle}</p>
      </td>
      <td>
        <p style={style}>{variantTitle}</p>
      </td>
      <td>
        <p style={style}>{sku}</p>
      </td>
      <td>
        <p
          style={{
            ...style,
            color: Number(skuInfo.stock) > 5 ? "green" : "red",
          }}
        >
          {skuInfo.stock}
        </p>
      </td>
    </tr>
  );
}
