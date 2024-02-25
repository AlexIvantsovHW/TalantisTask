import { api } from "@/shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enc, MD5 } from "crypto-js";

const password = "Valantis";
const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");

const md5Hash = MD5(`${password}_${timestamp}`).toString(enc.Hex);

export const itemApi = createApi({
  reducerPath: "api/items",
  baseQuery: fetchBaseQuery({
    baseUrl: api.serverURL,
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            localStorage.setItem("Data", JSON.stringify(data));
          }
        } catch (e) {
          console.error(e);
          localStorage.setItem("apiError", JSON.stringify(e));
        }
      },
    }),
    getItem: build.mutation({
      query: (getItem) => ({
        url: `/`,
        method: "POST",
        body: getItem,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            localStorage.setItem("Data", JSON.stringify(data));
          }
        } catch (e) {
          console.error(e);
          localStorage.setItem("apiError", JSON.stringify(e));
        }
      },
    }),
  }),
});

export const { useGetIdsMutation, useGetItemMutation } = itemApi;
