import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/feed");
      }
      if (!user) {
        navigate("/sign-in");
      }
    });
  }, []);

  return (
    <div className="">

    </div>
  );
};

export default NotFound;
