import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const LogoutService = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await auth.signOut();
    navigate("/sign-in");
  };
  return { logout };
};
