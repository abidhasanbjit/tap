import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

// ── Plain base query with no Authorization header ─────────────────────────────
// Used for public endpoints: login, register, forgot/reset password, etc.
export const baseQueryPublic = fetchBaseQuery({
  baseUrl: BASE_URL,
});
