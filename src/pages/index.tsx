import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useGetIdsMutation } from "@/app/store/item.api";
import IsLoaderOrError from "@/shared/components/isLoaderOrError/isLoaderOrError";
import s from "../styles/Main.module.css";
import { Table } from "@/shared/components/Table/table.component";
import { Pagination } from "@/shared/components/pagination/Pagination.component";
import InputPriceComponent from "@/shared/components/Input/InputPrice.component";
import InputProduct from "@/shared/components/Input/InputProduct.component";
import InputBrand from "@/shared/components/Input/InputBrand.component";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filterDiv, setFilterDiv] = useState<boolean>(false);
  const [inputPrice, setInputPrice] = useState<number>();
  const [inputProduct, setInputProduct] = useState<string>();
  const [inputBrand, setInputBrand] = useState<string>();
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
  const [isFilterProduct, setFilterProduct] = useState<boolean>(false);
  const [isFilterBrand, setFilterBrand] = useState<boolean>(false);

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
        params: { price: inputPrice },
      };
      setFilterSubmit(false);
      getIds(filter);
    }
  }, [isFilterSubmit]);
  useEffect(() => {
    if (isFilterProduct) {
      const filter = {
        action: "filter",
        params: { product: inputProduct },
      };
      setFilterProduct(false);
      getIds(filter);
    }
  }, [isFilterProduct]);
  useEffect(() => {
    if (isFilterBrand) {
      const filter = {
        action: "filter",
        params: { brand: inputBrand },
      };
      setFilterBrand(false);
      getIds(filter);
    }
  }, [isFilterBrand]);

  function openFilter() {
    setFilterDiv(!filterDiv);
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
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-dark`}
    >
      <h1 className="text-white">Valantis task assessment</h1>
      <div className="flex flex-col items-stretch border-solids  w-full h-96 ">
        <div className={s.header}>
          <Pagination
            page={page}
            setFilterDiv={setFilterDiv}
            filterDiv={filterDiv}
            setPage={setPage}
          />
        </div>
        {itemData?.result ? <Table itemData={itemData.result} /> : null}
        {filterDiv ? (
          <div className={s.filterBlock}>
            <InputPriceComponent
              inputPrice={inputPrice}
              setInputPrice={setInputPrice}
              setFilterSubmit={setFilterSubmit}
              type={"number"}
              price={"price"}
            />
            <InputProduct
              inputProduct={inputProduct}
              setInputProduct={setInputProduct}
              setFilterProduct={setFilterProduct}
              type={"string"}
              product={"product"}
            />
            <InputBrand
              inputBrand={inputBrand}
              setInputBrand={setInputBrand}
              setFilterBrand={setFilterBrand}
              type={"string"}
              brand={"brand"}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}
