import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct, IUser } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "products",
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
    }),
    getSearchedUser: builder.query<IUser[], string>({
      query: (searchTerm) => `users?firstname=${searchTerm}`,
    }),
    getSearchedProduct: builder.query<IProduct[], string>({
      query: (searchTerm) => `products?title=${searchTerm}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetSearchedUserQuery,
  useGetSearchedProductQuery,
} = api;
