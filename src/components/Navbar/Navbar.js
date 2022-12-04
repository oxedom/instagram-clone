import instaIcon from "../../assests/sam-logo.png";
import uploadIcon from "../../assests/uploadPhoto.png";
import homepageIcon from "../../assests/homeicon.png";

import { Link } from "react-router-dom";
import { LogoutService } from "../../services/LogoutService";
import userIcon from "../../assests/emptyUser.png";
import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = ({ children }) => {
  //Fetching logout function
  const { logout } = LogoutService();

  const [userData, setUserData] = useState("");
  const { getUserByUsername } = UserService();

  const handleLogout = async () => {
    await logout();
  };

  const fetchData = useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userData = await getUserByUsername(user.displayName);

          setUserData({ ...userData, ...user });
        }
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  const handleBottomHome = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <nav className="bg-white border shadow-lg hidden  md:block ">
        <div className="flex justify-around items-center m-3 ">
          <Link to="/feed">
            <img
              alt="Instagram"
              className=" object-contain h-8 w-18 sm:h-10 sm:w-30"
              src={instaIcon}
            />
          </Link>

          <div className="flex items-center gap-3">
            <div
              className="rounded text-white  hover:cursor-pointer  text-center font-bold btn p-1 bg-blue-400 hover:bg-blue-500 "
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </div>

            <div>
              <Link to={"/upload"}>
                <img
                  alt="upload"
                  className="oject-cover aspect-ratio: auto; w-8 h-8 sm:w-10 sm:h-10"
                  src={uploadIcon}
                />
              </Link>
            </div>

            <div>
              <Link to={`/profile/${userData.username}`}>
                {userData && (
                  <img
                    className="rounded-full object-cover aspect-ratio: auto; w-10 h-10"
                    alt="profile"
                    src={userData.photoURL}
                  />
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>



      <div  className="flex p-3 justify-center  items-stretch inset-x-0 top-0   border shadow  bg-white   md:hidden ">
        <input className="bg-gray-100 rounded-lg p-1 w-7/12 " placeholder=" Search" type='text'/>
        </div> 








      <div className="flex justify-center items-center">{children}</div>

      {/* BOTTOM NAV */}
      <nav className="block p-2 fixed inset-x-0 bottom-0 z-10 border shadow-lg  bg-white   md:hidden ">
        <div className="flex justify-around items-center ">
          <Link to="/feed">
            <img
              onClick={handleBottomHome}
              alt="Homepage feed"
              className=" object-contain h-8 w-18 "
              src={homepageIcon}
            />
          </Link>

          <div>
            <Link to={"/upload"}>
              <img
                alt="upload"
                className="bject-cover aspect-ratio: auto; w-8 h-8 sm:w-10 sm:h-10"
                src={uploadIcon}
              />
            </Link>
          </div>

          <div>
            <Link to={`/profile/${userData.username}`}>
              {userData && (
                <img
                  className="rounded-full object-cover aspect-ratio: auto; w-10 h-10"
                  alt="profile"
                  //Need to update photoURL

                  src={userData.photoURL}
                />
              )}
            </Link>
          </div>

          <div
            className="rounded text-white text-center font-bold btn p-2 bg-blue-400 hover:bg-blue-700"
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
