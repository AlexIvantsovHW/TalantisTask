
export type ItemProps = {
  id: number | string;
  brand: string | null;
  product: string;
  price: number;
};

const Item = ({ id, brand, product, price }: ItemProps) => {
  return (
    <>
      <div className="border-solids border-2 border-indigo-600 w-[90%] h-50px flex flex-row gap-[20px]">
        <div>{id}</div>
        <div>{product}</div>
        <div>{brand}</div>
        <div>{price}</div>
      </div>
    </>
  );
};

export default Item;
