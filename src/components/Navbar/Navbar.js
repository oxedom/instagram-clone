import instaIcon from "../../assests/sam-logo.png";
import uploadIcon from "../../assests/upload.png";
import homepageIcon from '../../assests/homepage.png'

import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../services/useUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
const Navbar = ({children}) => {
  //Fetching logout function
  const { logout } = useLogout();

  const [userData, setUserData] = useState("");
  const {getUserByUsername} = useUser()
  //Handle logout, uses logout hook to log user out server and client
  const handleLogout = async () => { await logout(); };

  const fetchData = useCallback(async ()=> {


      onAuthStateChanged(auth, async (user) => 
      {
        if(user) 
        {
          const userData = await getUserByUsername(user.displayName)

          setUserData({...userData, ...user})
        }
      })






  }, [])
  
  useEffect(() => {


   fetchData()
  }, []);

  return (
    
    <div className="flex flex-col">


        <nav className="bg-white border shadow-lg hidden md:block ">
      <div className="flex justify-around items-center m-3 ">
        <Link to="/feed">
          <img
            alt="Instagram"
            className=" object-contain h-8 w-18 sm:h-10 sm:w-30 "
            src={instaIcon}
          />
        </Link>


        <div className="flex items-center gap-3">
          <div
            className="rounded text-white    text-center font-bold btn p-1 bg-blue-500 hover:bg-blue-700`"
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </div>

          <div>
            <Link to={'/upload'}>
            <img className='bject-cover aspect-ratio: auto; w-8 h-8 sm:w-10 sm:h-10' src={uploadIcon}/>
            </Link>
           
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

    {children}
    {/* BOTTOM NAV */}
    <nav className="block p-4 fixed inset-x-0 bottom-0 z-10 border shadow-lg bg-white   md:hidden ">
    <div className="flex justify-around items-center ">


    


        <Link to="/feed">
          <img
            alt="Homepage feed"
            className=" object-contain h-8 w-18 "
            src={homepageIcon}
          />
        </Link>



 
          <div>
            <Link to={'/upload'}>
            <img className='bject-cover aspect-ratio: auto; w-8 h-8 sm:w-10 sm:h-10' src={uploadIcon}/>
            </Link>
           
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

          <div
            className="rounded text-white    text-center font-bold btn p-1 bg-blue-500 hover:bg-blue-700`"
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </div>


    
      </div>

       </nav>
       </div>

  );
};
export default Navbar;
