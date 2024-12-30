import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  
    // auth?.user? <Outlet /> : <Navigate to="/LoginPage" state={{from: location }} replace/>
    // auth?.role?.find((role) => allowedRoles.includes(role)) ? (
    /* auth?.role === allowedRoles ? (
      <Outlet />
    ) : auth?.userName ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="login" state={{ from: location }} replace />
    )
  ); */

  if(!auth?.token){
    return <Navigate to="/login" state={{ from: location }} replace />;
}

// if (allowedRoles && !allowedRoles.includes(auth?.role)) {
if (allowedRoles && !allowedRoles === auth?.role) {
  return <Navigate to="/unauthorized" replace />
}


return <Outlet/>
}

