import type { ComponentType } from 'react';
import type { Role } from '@/types/auth.types';
import ProjectsPage from '@/pages/Projects';
import Dashboard from '@/pages/dashboard';

// ─────────────────────────────────────────────────────────────────────────────
// Route registry
//
// To add a new authenticated page:
//   1. Import your page component above.
//   2. Push a new entry to the `authenticatedRoutes` array below.
//      - path        : URL path (e.g. '/dashboard')
//      - component   : The page component
//      - allowedRoles: Optional — omit to allow ALL authenticated roles.
//                      Provide a Role[] to restrict access.
// ─────────────────────────────────────────────────────────────────────────────

export interface RouteDefinition {
  path: string;
  component: ComponentType;
  /** Roles permitted to visit this route. Omit = all authenticated users. */
  allowedRoles?: Role[];
}

const authenticatedRoutes: RouteDefinition[] = [
  // ── Add new pages here ────────────────────────────────────────────────────
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/projects',
    component: ProjectsPage,
  },
  // Example restricted route:
  // {
  //   path: '/manage-project',
  //   component: ManageProjectPage,
  //   allowedRoles: [Role.SUPER_ADMIN, Role.ADMIN],
  // },
];

export default authenticatedRoutes;
