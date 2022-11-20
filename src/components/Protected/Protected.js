import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const userObj = JSON.parse(localStorage.getItem("userInfo"));

  if (userObj === null) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default Protected;
