import { Outlet } from 'react-router-dom';
import type { Role } from '@/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles: _allowedRoles }: ProtectedRouteProps) {
  // Uncomment below to enable auth + role guards:
  // const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  // if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (_allowedRoles && user && !_allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
