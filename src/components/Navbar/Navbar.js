import { Link } from "react-router-dom";
import instaIcon from '../../assests/sam-logo.png'
import Userwidget from "../Userwidget/Userwidget";
import { useAuthContext } from "../../hooks/useAuthContext"
const Navbar = () => {


  const {user} = useAuthContext()
   
  const handleLogout = () => 
  {

  }

  return (
    <nav >
      <div className="flex justify-center items-center">
        <img className=" object-contain h-40 w-30"src={instaIcon} />
      </div>
 

  
      <div>
      <Link to='/profile'> <Userwidget></Userwidget> </Link>
      <Link to='/feed'>Feed </Link>
      <Link to='/search'>Settings </Link>
      <Link to='/profile'>Settings </Link>

      </div>

      
    </nav>
  );
};
export default Navbar;
