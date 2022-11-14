import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ user, children }) => {

    if (!user) {
      return (<Navigate to="/log-in" replace />)
    }
  
    return children;
  };

  export default ProtectedRoute;

   
