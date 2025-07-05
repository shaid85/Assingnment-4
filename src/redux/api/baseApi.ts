// RTK query - redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://phl2b5-assignment-3.vercel.app/api',
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({
        offset = 0,
        limit = 10,
        sortBy = 'createdAt',
        sort = 'asc',
        filter = '',
      }) => {
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
          sortBy,
          sort,
        })
        if (filter) params.append('filter', filter)
        return `/books?${params.toString()}`
      },
      providesTags: ['Books'],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
        headers: { 'Content-Type': 'application/json' },
      }),
      // Invalidate the getItems cache
      invalidatesTags: ['Books'],
    }),
    editBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/books/${id}`,
        method: 'PUT', // or 'PATCH' based on your backend
        body: bookData,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBookById: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

    getBorrowedBooks: builder.query({
      query: () => '/borrow',
      providesTags: ['Books'],
    }),
    borrowBookById: builder.mutation({
      query: (bookData) => ({
        url: `/borrow`,
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),
    // borrowBookById
  }),
})

export const {
  useGetItemsQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetBorrowedBooksQuery,
  useDeleteBookByIdMutation,
  useBorrowBookByIdMutation,
} = bookApi
