import { ChangeEvent } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import s from "../../../styles/Main.module.css";

type Props = {
  setFilterBrand: React.Dispatch<React.SetStateAction<boolean>>;
  inputBrand: string | undefined;
  setInputBrand: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: "string" | "number";
  brand: string;
};

export const InputBrand = ({
  inputBrand,
  setInputBrand,
  setFilterBrand,
  type,
  brand,
}: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputBrand(event.target.value);
  };

  return (
    <div className="  w-full">
      <div className={s.price}>
        <p className="text-white">Бренд</p>
        <input
          type={type}
          id="textInput"
          name="textInput"
          value={inputBrand}
          onChange={handleInputChange}
          placeholder={brand}
        />
        <button
          className={
            "btn btn-dark d-flex justify-content-center align-items-center gap-2"
          }
          onClick={() => setFilterBrand(true)}
        >
          <BsFillCloudDownloadFill />{" "}
        </button>
      </div>
    </div>
  );
};
export default InputBrand;
