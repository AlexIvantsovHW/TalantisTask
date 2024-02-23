import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Inter } from "next/font/google";

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
  return isIdsLoading || isItemLoading ? (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-[100px] h-[100px]">
        <Spinner />
      </div>
    </main>
  ) : isIdsError || isItemError ? (
    <div>Error</div>
  ) : (
    false
  );
};
export default IsLoaderOrError;
