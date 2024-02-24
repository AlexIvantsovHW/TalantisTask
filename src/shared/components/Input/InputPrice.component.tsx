import { ChangeEvent } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import s from "../../../styles/Main.module.css";

type Props = {
  setFilterSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  inputPrice: number | undefined;
  setInputPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  type: "string" | "number";
  price: string;
};

export const InputPriceComponent = ({
  inputPrice,
  setInputPrice,
  setFilterSubmit,
  type,
  price,
}: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPrice(Number(event.target.value));
  };

  return (
    <div className="w-full">
      <div className={s.price}>
        <p className={"text-white"}>Цена</p>
        <input
          type={type}
          id="textInput"
          name="textInput"
          value={inputPrice}
          onChange={handleInputChange}
          placeholder={price}
        />
        <button
          className={
            "btn btn-dark d-flex justify-content-center align-items-center gap-2"
          }
          onClick={() => setFilterSubmit(true)}
        >
          <BsFillCloudDownloadFill />{" "}
        </button>
      </div>
    </div>
  );
};
export default InputPriceComponent;
