import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  const token = sessionStorage.getItem("token");
  const storedRole = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = auth?.role || storedRole;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  //   if(!auth?.token){
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // if (allowedRoles && !allowedRoles.includes(auth?.role)) {
  // // if (allowedRoles && !allowedRoles === auth?.role) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  return <Outlet />;
}
