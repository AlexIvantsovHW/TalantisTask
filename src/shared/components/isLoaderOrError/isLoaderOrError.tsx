import { handleRefresh } from "@/shared/functions/Reload";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { IoReloadCircle } from "react-icons/io5";

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
  return isIdsLoading || isItemLoading ? (
    <main
      className={`bg-dark w-full min-h-screen d-flex justify-content-center align-items-center`}
    >
      <div className="w-[100px] h-[100px]">{<Spinner />}</div>
    </main>
  ) : isIdsError || isItemError ? (
    <main
      className={`bg-dark w-full min-h-screen d-flex justify-content-center align-items-center `}
    >
      <div className="w-[100px] h-[100px]">
        <button onClick={handleRefresh}>
          <div className=" flex flex-col gap-20 align-center justify-center">
            <h1 className="font-bold text-white">Ошибка</h1>{" "}
            <button
              className={
                "btn btn-dark d-inline-block p-3 d-flex justify-content-center align-items-center"
              }
            >
              <IoReloadCircle style={{ width: "40px", height: "40px" }} />
            </button>
          </div>
        </button>
      </div>
    </main>
  ) : (
    false
  );
};
export default IsLoaderOrError;
