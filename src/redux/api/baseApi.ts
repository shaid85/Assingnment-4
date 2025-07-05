// RTK query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://phl2b5-assignment-3.vercel.app/api',
  }),
  endpoints: (builder) => ({
    // example endpoint
    getItems: builder.query({
      query: () => '/books',
    }),
  }),
})

export const { useGetItemsQuery } = bookApi
