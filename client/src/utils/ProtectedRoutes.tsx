import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { UserContext } from "../UserContextProvider";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default ProtectedRoutes;
