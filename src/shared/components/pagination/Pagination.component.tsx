import { BsFilterSquareFill } from "react-icons/bs";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import s from "../../../styles/Main.module.css";
import { IoMdDownload } from "react-icons/io";
import { handleRefresh } from "@/shared/functions/Reload";
type Props = {
  page: number;
  setFilterDiv: React.Dispatch<React.SetStateAction<boolean>>;
  filterDiv: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
export const Pagination = ({
  page,
  setFilterDiv,
  filterDiv,
  setPage,
}: Props) => {
  function openFilter() {
    setFilterDiv(!filterDiv);
  }

  function nextPage() {
    setPage(page + 50);
  }

  function previousPage() {
    setPage(Math.max(0, page - 50));
  }
  return (
    <>
      {page === 0 ? null : (
        <button
          onClick={previousPage}
          className="btn btn-dark d-flex justify-content-center align-items-center gap-2 h-100"
        >
          {page - 50}
          <SlArrowLeftCircle />
        </button>
      )}

      <div className="bg-dark d-inline-block rounded-3 p-3 text-white d-flex justify-content-center align-items-center gap-2 h-100 font-bold">
        {page}
      </div>
      <button
        onClick={nextPage}
        className="btn btn-dark d-flex justify-content-center align-items-center gap-2 h-100"
      >
        <SlArrowRightCircle /> {page + 50}
      </button>
      <button onClick={openFilter} className="btn btn-dark h-100">
        <BsFilterSquareFill />
      </button>
      <button
        type="button"
        className="btn btn-dark d-flex justify-content-center align-items-center gap-2 h-100"
        onClick={handleRefresh}
      >
        <IoMdDownload /> Все данные
      </button>
    </>
  );
};
