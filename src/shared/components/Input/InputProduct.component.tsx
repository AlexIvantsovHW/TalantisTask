import { ChangeEvent } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import s from "../../../styles/Main.module.css";

type Props = {
  setFilterProduct: React.Dispatch<React.SetStateAction<boolean>>;
  inputProduct: string | undefined;
  setInputProduct: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: "string" | "number";
  product: string;
};

export const InputProduct = ({
  inputProduct,
  setInputProduct,
  setFilterProduct,
  type,
  product,
}: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputProduct(event.target.value);
  };

  return (
    <div className="w-full">
      <div className={s.price}>
        <p className="text-white">Название</p>
        <input
          type={type}
          id="textInput"
          name="textInput"
          value={inputProduct}
          onChange={handleInputChange}
          placeholder={product}
        />
        <button
          className={
            "btn btn-dark d-flex justify-content-center align-items-center gap-2"
          }
          onClick={() => setFilterProduct(true)}
        >
          <BsFillCloudDownloadFill />
        </button>
      </div>
    </div>
  );
};
export default InputProduct;
