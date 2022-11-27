import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
const Protected = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/sign-in");
      }
    });
  }, []);

  return children;
};

export default Protected;
