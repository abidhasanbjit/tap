import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// ── JSONPlaceholder dummy API (no auth required) ──────────────────────────────
export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),

  // Declare all tag types used across this API
  tagTypes: ['Post', 'Todo'],

  // Global default: no cache
  keepUnusedDataFor: 0,

  endpoints: (builder) => ({

    // ✅ CACHED 2min + provides 'Post' list tag
    // Refetches automatically when any mutation invalidates 'Post'
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      keepUnusedDataFor: 120,
      providesTags: (result) =>
        result
          ? [
              // Tag each individual post: { type: 'Post', id: 1 }, { type: 'Post', id: 2 }, …
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              // Tag the whole list so list-level invalidation works too
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // ✅ CACHED 5min + provides a single Post tag by id
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      keepUnusedDataFor: 300,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    // ❌ NOT CACHED + provides 'Todo' list tag
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos?_limit=5',
      keepUnusedDataFor: 0,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),

    // 🗑️ Invalidates the entire Post list cache → getPosts refetches automatically
    createPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    // 🗑️ Invalidates only the specific post that was updated
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),

    // 🗑️ Invalidates the specific post AND the list
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetTodosQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = dummyApi;
