import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import type { User } from '../../types/auth.types';

// ── User API — all endpoints are PRIVATE (access token required) ──────────────
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,

  // Global default: no cache. Override per-endpoint below where needed.
  keepUnusedDataFor: 0,

  endpoints: (builder) => ({

    // ✅ CACHED — profile rarely changes; cache for 5 minutes
    getProfile: builder.query<User, void>({
      query: () => '/user/profile',
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // ❌ NOT CACHED — mutations are never cached by default
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
    }),

    // ❌ NOT CACHED — always fetch the latest list
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      keepUnusedDataFor: 0,
    }),

  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
} = userApi;
