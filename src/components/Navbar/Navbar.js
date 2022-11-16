import { Link } from "react-router-dom";
import instaIcon from '../../assests/text-logo.png'
import { useAuthContext } from "../../hooks/useAuthContext"
const Navbar = () => {


  const {user} = useAuthContext()
   
  const handleLogout = () => 
  {

  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="max-w-10xl mx-auto px-4">
        <div className="flex justify-around">
          <Link to="/" className="flex">
            <img
              className="mr-3 h-6 sm:h-9"
              src={instaIcon}
              alt="instagram-logo"
            />
         
          </Link>

          <input name="search" className="border " type="text" />
          <div>  </div>
          <Link to="/feed"> Feed</Link>
          <Link to="/profile"> Profile</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
