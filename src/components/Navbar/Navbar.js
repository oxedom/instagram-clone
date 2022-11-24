import instaIcon from "../../assests/sam-logo.png";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../services/useUser";
const Navbar = () => {
  //Fetching logout function
  const { logout } = useLogout();

  const [userData, setUserData] = useState("");
  const {getUserByUsername} = useUser()
  //Handle logout, uses logout hook to log user out server and client
  const handleLogout = async () => { await logout(); };

  const fetchData = useCallback(async ()=> {
    
    const userData = await getUserByUsername(JSON.parse(localStorage.getItem("userInfo")).displayName)
    setUserData(userData)
  }, [])
  
  useEffect(() => {


   fetchData()
  }, []);

  return (
    <nav className="bg-white border shadow-lg">
      <div className="flex justify-around items-center m-3">
        <Link to="/feed">
          <img
            alt="Instagram"
            className=" object-contain h-10 w-30 md:block"
            src={instaIcon}
          />
        </Link>
        <div className="flex items-center gap-3">
          <div
            className="rounded text-white  text-center font-bold btn p-2 bg-blue-500 hover:bg-blue-700`"
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </div>


          <div>
            <Link to={`/profile/${userData.username}`}>
              <img
                className="rounded-full object-cover aspect-ratio: auto; w-10 h-10"
                alt="profile"
                //Need to update photoURL
                src={userData.photoURL}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
