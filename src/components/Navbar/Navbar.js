import { useNavigate } from "react-router-dom";
import instaIcon from '../../assests/sam-logo.png'

import {useLogout} from '../../hooks/useLogout'

const Navbar = () => {

  const navigate = useNavigate()
  const {logout} = useLogout()

  const handleLogout = () => { 
    logout()
    navigate('/sign-in')

  }


  return (
    <nav className="">
      
      <div className="flex justify-around items-center m-3">
        <img className=" object-contain  h-10 w-30 md:block"src={instaIcon} />
        <div className="rounded text-white  text-center font-bold btn p-2 bg-blue-500 hover:bg-blue-700`" onClick={handleLogout}> Logout  </div>
      </div> 
    </nav>
  );
};
export default Navbar;
