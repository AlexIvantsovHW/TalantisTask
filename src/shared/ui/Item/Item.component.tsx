import React from "react";
import style from "../../../styles/Main.module.css";

export type ItemProps = {
  id: number | string;
  brand: string | null;
  product: string;
  price: number;
};

const Item = ({ id, brand, product, price }: ItemProps) => {
  return (
    <tr className={style.itemRow}>
      <td className={style.itemCell}>
        <p>{id}</p>
      </td>
      <td className={style.itemCell}>{product}</td>
      <td className={style.itemCell}>{brand}</td>
      <td className={style.itemCell}>{price}</td>
    </tr>
  );
};

export default Item;
