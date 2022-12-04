import instaIcon from "../../assests/sam-logo.png";
import uploadIcon from "../../assests/uploadPhoto.png";
import homepageIcon from "../../assests/homeicon.png";
import myLikes from "../../assests/heart.png";
import { Link } from "react-router-dom";
import { LogoutService } from "../../services/LogoutService";
import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import UserIconSkeleton from "../Skeletons/UserIconSkeleton";

const Navbar = ({ children }) => {
  //Fetching logout function
  
  const { logout } = LogoutService();
  const [results , setResults] = useState([])
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [userData, setUserData] = useState("");
  const { getUserByUsername , searchUser} = UserService();

  const [query, setQuery] = useState("");

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
      behavior: "smooth",
    });
  };


  const fetchQuery = useCallback(async (query) => {
    const users = await searchUser(query)
    setResults(users)
  }, [])

  useEffect( () => {

    fetchQuery(query)
 
  }, [query])


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




          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            className="bg-gray-100 rounded-lg p-1"
            placeholder=" Search"
            type="text"
          />

           {results.map((u) => <div> {u.username} </div>)}
          

          <div className="flex items-center gap-3">

          <Link to='/likes'>
        <img
          className="oject-cover aspect-ratio: auto; w-7 h-7 ml-5 sm:w-8 sm:h-8"
          src={myLikes}
        />
        </Link>

  

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
                {(userData.photoURL) && (
                  <img
                    className="rounded-full object-cover aspect-ratio: auto; w-10 h-10"
                    alt="profile"
                    onLoad={() => {setProfileLoaded(true)} }
                    src={userData.photoURL}
                  />
                )}
                {(!profileLoaded && !userData)&& <div className="rounded-full object-cover aspect-ratio: auto; w-10 h-10"> 
                  <UserIconSkeleton> </UserIconSkeleton>
                </div>}
 
              </Link>

  


            </div>


            <div
              className="rounded text-white  hover:cursor-pointer  text-center font-bold btn p-1 bg-blue-400 hover:bg-blue-500 "
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </div>    
          </div>
        </div>
      </nav>

      <div className="flex p-3  justify-center items-center inset-x-0 top-0   border shadow  bg-white   md:hidden ">

        <input
        onChange={(e) => {
                  setQuery(e.target.value);
                  }}
                  value={query}
          className="bg-gray-100 rounded-lg p-1 w-7/12 "
          placeholder=" Search"
          type="text"
        />
        <Link to='/likes'>
        <img
          className="oject-cover aspect-ratio: auto; w-7 h-7 ml-5 sm:w-10 sm:h-10"
          src={myLikes}
        />
        </Link>
 
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
