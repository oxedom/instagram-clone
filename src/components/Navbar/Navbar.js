import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="max-w-10xl mx-auto px-4">
                <div class="flex justify-around">
                        <Link to='/' className="flex">
                            <img className="mr-3 h-6 sm:h-9" src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt='instagram-logo'/>
                            <span> Instagram</span>
                        </Link>
                        
                        <input name="search" className="border " type='text'/>
                      
                        <Link to='home'> Home</Link>
                        <Link to='settings'> Setting</Link> 
                        <Link to='Profile'> Profile</Link> 
                
      
                    </div>
                        </div>
   
        </nav>
    )
        
}
export default Navbar;


