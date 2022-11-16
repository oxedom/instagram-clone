import { Link, useNavigate } from "react-router-dom";
import instaIcon from '../../assests/sam-logo.png'
import Userwidget from "../Userwidget/Userwidget";
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react";
const Navbar = () => {

  const navigate = useNavigate()
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const [search, setSearch] = useState('')
  const handleLogout = () => { 
    logout()
    navigate('/sign-in')

  }
  const handleSearch = (e) => setSearch(e.target.value)



  return (
    <nav className="order-last sm:order-first">
      
      <div className="flex justify-around items-center m-3">
    
        <img className="hidden object-contain  h-10 w-30 md:block"src={instaIcon} />
   


        <input className="border justify-self-center to-black bg-slate-50  rounded"  onKeyDown={handleSearch} type='text' placeholder="Search"/> 
   
     
        <div className="rounded text-white  text-center font-bold btn p-2 bg-blue-500 hover:bg-blue-700`" onClick={handleLogout}> Logout  </div>
  
     
      
      
      

      </div>

 

  

      
    </nav>
  );
};
export default Navbar;
