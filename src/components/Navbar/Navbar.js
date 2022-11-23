import instaIcon from "../../assests/sam-logo.png";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import heart from '../../assests/heart.png'
import { useEffect, useState } from "react";
const Navbar = () => {

  //Fetching logout function 
  const { logout } = useLogout();

  
  const [userData, setUserData] = useState("")
  
  const handleLogout = async () => {
    await logout();
  };

  useEffect( () => {
    setUserData(JSON.parse(localStorage.getItem('userInfo')))


  }, [])

  return (
    <nav className="">
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
        {/* Likes Emoji route */}
        <div> 
        <Link  to='/likes'>
        <img className="object-contain w-10 h-10" alt="Like page feed" src={heart}/>
        </Link>
      
        </div>
        <div> 
          <Link to={`/profile/${userData.displayName}`}>
          <img className="rounded-full object-cover aspect-ratio: auto; w-10 h-10" alt="profile" src={userData.photoURL} />

          </Link>
          
           </div>
        </div>
        
      </div>
    </nav>
  );
};
export default Navbar;
