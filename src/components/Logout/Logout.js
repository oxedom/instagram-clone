import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Logout = () => {
  function handleClick() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="font-bold py-2 px-4 rounded" onClick={handleClick}>
      Sign out
    </div>
  );
};

export default Logout;
