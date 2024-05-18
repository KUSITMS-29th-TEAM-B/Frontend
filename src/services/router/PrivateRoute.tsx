import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../cookie";

const PrivateRoute = () => {
  const auth = !!getCookie("user")?.token; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
