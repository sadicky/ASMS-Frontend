import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: any) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!user || !user.roles) {
    return <Navigate to="/auth" replace />;
  }

  // ✅ vérifier si au moins 1 rôle match
  if (
    allowedRoles &&
    !user.roles.some((role: string) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;