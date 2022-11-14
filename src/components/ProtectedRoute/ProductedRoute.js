import React from "react";
import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { auth } from "../../firebase"



const ProtectedRoute = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {

        auth.currentUser == null ? setUser(false) : setUser(true);
      }, []);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
