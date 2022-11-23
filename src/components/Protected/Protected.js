import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const userObj = JSON.parse(localStorage.getItem("userInfo"));
  //If there is no user Object currenty stored in localstorage, log the user out
  if (userObj === null) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default Protected;
