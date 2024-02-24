import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/shared/ui/Button/Button.component";
import Item from "@/shared/ui/Item/Item.component";
import { useGetIdsMutation } from "@/app/store/item.api";
import IsLoaderOrError from "@/shared/components/isLoaderOrError/isLoaderOrError";
//import style from "../shared/ui/Item/Item.module.css";
import s from "../styles/Main.module.css";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { BsFillCloudDownloadFill, BsFilterSquareFill } from "react-icons/bs";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filterDiv, setFilterDiv] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [
    getIds,
    { data: idsData, isLoading: isIdsLoading, isError: isIdsError },
  ] = useGetIdsMutation();
  const [
    getItems,
    { data: itemData, isLoading: isItemLoading, isError: isItemError },
  ] = useGetIdsMutation();
  const [isFilterSubmit, setFilterSubmit] = useState<boolean>(false);

  useEffect(() => {
    const getId = async () => {
      const filter = {
        action: "get_ids",
        params: { offset: page, limit: 50 },
      };
      try {
        await getIds(filter);
      } catch (error) {
        console.error("Error getting IDs:", error);
      }
    };

    getId();
  }, [getIds, page]);

  useEffect(() => {
    const handleGetItems = async () => {
      if (idsData?.result) {
        const ids = {
          action: "get_items",
          params: { ids: idsData.result },
        };

        try {
          await getItems(ids);
        } catch (error) {
          console.error("Error getting items:", error);
        }
      }
    };

    if (idsData) {
      handleGetItems();
    }
  }, [idsData, getItems]);

  useEffect(() => {
    if (isFilterSubmit) {
      const filter = {
        action: "filter",
        params: { price: inputValue },
      };
      setFilterSubmit(false);
      getIds(filter);
    }
  }, [isFilterSubmit]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  function openFilter() {
    setFilterDiv(!filterDiv);
  }

  function nextPage() {
    setPage(page + 50);
  }

  function previousPage() {
    setPage(Math.max(0, page - 50));
  }

  if (isIdsLoading || isItemLoading || isIdsError || isItemError) {
    return (
      <IsLoaderOrError
        isIdsLoading={isIdsLoading}
        isItemLoading={isItemLoading}
        isIdsError={isIdsError}
        isItemError={isItemError}
      />
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-stretch border-solids border-2 border-indigo-600 w-full h-96 ">
        <div className={s.header}>
          {page === 0 ? null : (
            <button onClick={previousPage} className={s.btnS}>
              <p>{page - 50}</p>
              <SlArrowLeftCircle />
            </button>
          )}

          <p className="font-bold">{page}</p>
          <button onClick={nextPage} className={s.btnS}>
            <SlArrowRightCircle /> {page + 50}
          </button>
          <button onClick={openFilter}>
            <BsFilterSquareFill />
          </button>
        </div>
        <div className="w-full h-full  gap-[20px] overflow-y-auto">
          <table className={s.stickyTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {itemData?.result.map((e: any, id: any) => (
                <Item
                  id={e.id}
                  product={e.product}
                  brand={e.brand}
                  price={e.price}
                />
              ))}
            </tbody>
          </table>
        </div>
        {filterDiv ? (
          <div className=" border-solids border-1 border-indigo-600 w-full">
            <div className={s.price}>
              <p>Цена</p>
              <input
                type="number"
                id="textInput"
                name="textInput"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Price"
              />
              <button className={s.btn} onClick={() => setFilterSubmit(true)}>
                <BsFillCloudDownloadFill />{" "}
              </button>
            </div>
          </div>
        ) : null}
        <div className="border-solids border-top-2 border-indigo-600 w-full h-[50px] flex justify-around"></div>
      </div>
    </main>
  );
}
