import {
  LayoutDashboard,
  FolderOpen ,
  FolderCog,
  FlaskConical,
  Cog,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Role } from '../types/auth.types';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  /** Roles allowed to see this item. Empty array = no one. Omit = all roles. */
  allowedRoles: Role[];
}

const ALL_ROLES = [Role.SUPER_ADMIN, Role.ADMIN, Role.USER];
const ADMIN_AND_ABOVE = [Role.SUPER_ADMIN, Role.ADMIN];

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    allowedRoles: ALL_ROLES,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderOpen ,
    allowedRoles: ALL_ROLES,
  },
  {
    label: 'Manage Project',
    path: '/manage-project',
    icon: FolderCog,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    label: 'Test',
    path: '/test',
    icon: FlaskConical,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    label: 'Run',
    path: '/run',
    icon: Cog,
    allowedRoles: ADMIN_AND_ABOVE,
  },
];

/** Returns only the nav items visible to the given role. */
export function getNavItemsForRole(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => item.allowedRoles.includes(role));
}
