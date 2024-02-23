import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Button = ({ children }: Props) => {
  return (
    <button
      className="border-solids border-2 border-indigo-600"
      onClick={() => {
        alert(children);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
