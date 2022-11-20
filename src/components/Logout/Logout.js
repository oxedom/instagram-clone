import { signOut } from "firebase/auth";
import { useLogout} from "../../hooks/useLogout"
import { auth } from "../../firebase";

const Logout = () => {

  const logout = useLogout()

  async function handleClick()  {

    try {
      logout.logout()
      await signOut(auth)
      console.log("User signed out")
    }
    catch (err) 
    {
      console.log(err);
    }

   
  }
  return (
    <div className="font-bold py-2 px-4 rounded" onClick={handleClick}>
      Sign out
    </div>
  );
};

export default Logout;
