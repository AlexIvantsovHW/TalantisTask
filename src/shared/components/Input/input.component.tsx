import { ChangeEvent } from "react";

export type HandleInputChangeFn = (
  event: ChangeEvent<HTMLInputElement>
) => void;

const InputComponent = (
  inputValue: number,
  handleInputChange: HandleInputChangeFn
) => {
  return (
    <div className=" border-solids border-1 border-indigo-600 w-full">
      <div>
        <p>цена</p>
        <input
          type="number"
          id="textInput"
          name="textInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Price"
        />
      </div>
    </div>
  );
};
export default InputComponent;
