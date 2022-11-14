import React from "react";
import { Navigate } from "react-router";
import { useContext } from "react";
import { newContext } from "../../context/context";


const ProtectedRoute = ({ children }) => {

  const userContext = useContext(newContext)
  console.log(userContext.userData);

  if (userContext.userData === false) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
