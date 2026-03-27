import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../api/modules/authApi';
import { userApi } from '../api/modules/userApi';
import { dummyApi } from '../api/modules/dummyApi';

export const store = configureStore({
  reducer: {
    // Auth state slice (tokens, user, isAuthenticated)
    auth: authReducer,

    // RTK Query API reducers — add every new API module here
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // RTK Query middleware enables caching, invalidation, polling, etc.
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(dummyApi.middleware),
});

// ── TypeScript helpers ────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
