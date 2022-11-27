import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {

    await auth.signOut();
    setTimeout(navigate("/sign-in"), 0);

  };
  return { logout };
};
