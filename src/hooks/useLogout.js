import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.setItem("userInfo", null);
    await auth.signOut();
    setTimeout(navigate("/sign-in"), 0);
    console.log("Logged out");
  };
  return { logout };
};
