import { removeDuplicates } from "@/shared/functions/uniqueId";
import s from "../../../styles/Main.module.css";
import Item from "@/shared/ui/Item/Item.component";

type Props = {};
export const Table = ({ itemData }: any) => {
  return (
    <div className={s.body}>
      <table className="table table-striped table-dark table-hover">
        <thead className="sticky-top ">
          <tr>
            <th className="text-center">№</th>
            <th className="text-center">ID</th>
            <th className="text-center">Product</th>
            <th className="text-center">Brand</th>
            <th className="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          {removeDuplicates(itemData).map((e: any, id: any) => (
            <Item
              id={e.id}
              product={e.product}
              brand={e.brand}
              price={e.price}
              el={id + 1}
              key={id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
