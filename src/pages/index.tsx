import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Button from "@/shared/ui/Button/Button.component";
import Item from "@/shared/ui/Item/Item.component";
import { useGetIdsMutation } from "@/app/store/item.api";
import IsLoaderOrError from "@/shared/components/isLoaderOrError/isLoaderOrError";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filterDiv, setFilterDiv] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(0);
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
        params: { price: 17500 },
      };
      setFilterSubmit(false);
      getIds(filter); // Fix: Replace setIdSubmit with setFilterSubmit
    }
  }, [isFilterSubmit]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const openFilter = () => {
    setFilterDiv(!filterDiv);
  };

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
        <div className="border-solids border-2 border-indigo-600 w-full h-[50px]">
          <button onClick={previousPage}>Предыдущая страница</button>
          <button onClick={nextPage}>Следующая страница</button>
        </div>
        <div className="border-solids border-2 border-indigo-600 w-full h-full flex justify-content items-center flex-col gap-[20px] overflow-y-auto">
          {itemData?.result.map((e: any, id: any) => (
            <Item
              id={e.id}
              product={e.product}
              brand={e.brand}
              price={e.price}
              key={id}
            />
          ))}
        </div>
        {filterDiv ? (
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
            <div>
              <p>Товар</p>
              <input
                type="text"
                id="textInput"
                name="textInput"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>
          </div>
        ) : null}
        <div className="border-solids border-top-2 border-indigo-600 w-full h-[50px] flex justify-around">
          <button onClick={() => setFilterSubmit(true)}>
            Загрузить информацию
          </button>
          <button onClick={openFilter}>Фильтры</button>
        </div>
      </div>
    </main>
  );
}
