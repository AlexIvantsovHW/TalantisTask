import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Inter } from "next/font/google";
import { IoReloadCircle } from "react-icons/io5";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  isIdsLoading: boolean;
  isItemLoading: boolean;
  isIdsError: boolean;
  isItemError: boolean;
};
const IsLoaderOrError = ({
  isIdsLoading,
  isItemLoading,
  isIdsError,
  isItemError,
}: Props) => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return isIdsLoading || isItemLoading ? (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <div className="w-[100px] h-[100px]">Is Loading</div>
    </main>
  ) : isIdsError || isItemError ? (
    <main className={`flex min-h-screen w-full items-center justify-center `}>
      <div className="w-[100px] h-[100px]">
        <button onClick={handleRefresh}>
          <div className=" flex flex-col gap-20 align-center justify-center">
            <h1 className="font-bold">Ошибка</h1>{" "}
            <IoReloadCircle style={{ width: "40px", height: "40px" }} />
          </div>
        </button>
      </div>
    </main>
  ) : (
    false
  );
};
export default IsLoaderOrError;
