import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { updateTokens, setUnauthenticated } from '../store/slices/authSlice';
import type { RefreshTokenResponse } from '../types/auth.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

// ── Base query that attaches the Bearer token to every request ────────────────
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// ── Mutex flag — prevents multiple simultaneous refresh calls ─────────────────
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

// ── Wrapper that handles 401: refresh → retry, or force unauthenticated ───────
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for any in-flight refresh to finish before proceeding
  if (isRefreshing && refreshPromise) {
    await refreshPromise;
  }

  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      // No refresh token available — user must log in again
      api.dispatch(setUnauthenticated());
      return result;
    }

    if (!isRefreshing) {
      isRefreshing = true;

      refreshPromise = (async () => {
        try {
          // Call the refresh endpoint directly (no auth header needed)
          const refreshResult = await fetchBaseQuery({ baseUrl: BASE_URL })(
            {
              url: '/auth/refresh-token',
              method: 'POST',
              body: { refreshToken: currentRefreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const tokens = refreshResult.data as RefreshTokenResponse;
            api.dispatch(updateTokens(tokens));
            return true;
          } else {
            // Refresh token is invalid or expired
            api.dispatch(setUnauthenticated());
            return false;
          }
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      const refreshed = await refreshPromise;

      if (refreshed) {
        // Retry the original request with the new token
        result = await baseQueryWithAuth(args, api, extraOptions);
      }
    } else {
      // Another call is already refreshing — wait for it, then retry
      if (refreshPromise) {
        const refreshed = await refreshPromise;
        if (refreshed) {
          result = await baseQueryWithAuth(args, api, extraOptions);
        }
      }
    }
  }

  return result;
};
