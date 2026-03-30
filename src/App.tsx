import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import authenticatedRoutes from "@/routes/routes";
import NotFoundPage from "@/pages/404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes  add login / register pages here */}
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />

        {/* Authenticated routes  registered in src/routes/routes.tsx */}
        {authenticatedRoutes.map(({ path, component: Page, allowedRoles }) => (
          <Route
            key={path}
            element={<ProtectedRoute allowedRoles={allowedRoles} />}
          >
            <Route path={path} element={<Page />} />
          </Route>
        ))}

        {/* 404 — catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
