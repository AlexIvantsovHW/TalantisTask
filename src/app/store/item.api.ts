import { api } from "@/shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enc, MD5 } from "crypto-js";

const password = "Valantis";
const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");

const md5Hash = MD5(`${password}_${timestamp}`).toString(enc.Hex);

console.log(md5Hash);

export const itemApi = createApi({
  reducerPath: "api/items",
  baseQuery: fetchBaseQuery({
    baseUrl: api.serverURL,
    referrerPolicy: "unsafe-url",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("X-Auth", md5Hash);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getIds: build.mutation({
      query: (getIds) => ({
        url: `/`,
        method: "POST",
        body: getIds,
      }),
    }),
    getItem: build.mutation({
      query: (getItem) => ({
        url: `/`,
        method: "POST",
        body: getItem,
      }),
    }),
  }),
});

export const { useGetIdsMutation, useGetItemMutation } = itemApi;
