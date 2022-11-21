import instaIcon from "../../assests/sam-logo.png";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="">
      <div className="flex justify-around items-center m-3">
        <Link to='/feed'>
        <img className=" object-contain  h-10 w-30 md:block" src={instaIcon} />

           </Link>
        <div
          className="rounded text-white  text-center font-bold btn p-2 bg-blue-500 hover:bg-blue-700`"
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
