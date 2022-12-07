import instaIcon from "../../assests/pet-logo.png";
import uploadIcon from "../../assests/uploadPhoto.png";
import homepageIcon from "../../assests/homeicon.png";

import { Link } from "react-router-dom";
import { LogoutService } from "../../services/LogoutService";
import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import UserIconSkeleton from "../Skeletons/UserIconSkeleton";
import igIcon from "../../assests/instaIcon.png";

const Navbar = ({ children }) => {
  //Fetching logout function

  const { logout } = LogoutService();
  const [results, setResults] = useState([]);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [userData, setUserData] = useState("");
  const { getUserByUsername, searchUser } = UserService();
  const [showSearch, setShowSearch] = useState(false);
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
  }, [searchUser, getUserByUsername]);

  const handleBottomHome = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const fetchQuery = useCallback(async (query) => {
    const users = await searchUser(query);
    setResults(users);
  }, []);

  const handleResultClick = () => {
    setQuery("");
  };

  useEffect(() => {
    setShowSearch(true);
    fetchQuery(query);
  }, [query]);

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
              className=" object-contain active:scale-105  h-8 w-18 sm:h-10 sm:w-30"
              src={instaIcon}
            />
          </Link>

          <div className="flex flex-col items-center ">
            <input
              onClick={() => {
                setShowSearch(true);
              }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
              className="bg-gray-100 rounded-lg p-1"
              placeholder=" Search"
              type="text"
            />

            {results.length > 0 && showSearch && (
              <ul className="flex flex-col gap-2 mt-10 z-20 border boder-black p-3 rounded-2xl shadow-lg absolute  bg-white w-[400px]">
                {results.map((u) => (
                  <Link key={u.username} to={`/profile/${u.username}`}>
                    <div
                      onClick={handleResultClick}
                      className="flex gap-2 bg-white  rounded-2xl items-center"
                    >
                      <img
                        alt={u.username}
                        className="rounded-full object-cover shadow aspect-ratio: auto; w-12 h-12"
                        src={u.photoURL}
                      />
                      <li> {u.username}</li>
                    </div>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div>
              <Link to={"/upload"}>
                <img
                  alt="upload"
                  className="object-cover aspect-ratio:auto active:scale-105  auto; w-8 h-8 sm:w-10 sm:h-10"
                  src={uploadIcon}
                />
              </Link>
            </div>

            <div>
              <Link to={`/profile/${userData.username}`}>
                {userData.photoURL && (
                  <img
                    className="rounded-full object-contain active:scale-105  object-cover aspect-ratio: auto; w-10 h-10"
                    alt="profile"
                    onLoad={() => {
                      setProfileLoaded(true);
                    }}
                    src={userData.photoURL}
                  />
                )}
                {!profileLoaded && !userData && (
                  <div className="rounded-full object-cover aspect-ratio: auto; w-10 h-10">
                    <UserIconSkeleton> </UserIconSkeleton>
                  </div>
                )}
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

      <div className="flex p-3  justify-around items-center inset-x-0 top-0   border shadow  bg-white   md:hidden ">
        <Link to="/feed">
          <img
            alt="Instagram"
            className="object-cover  active:scale-105 aspect-ratio: auto; w-7 h-7  sm:w-10 sm:h-10"
            src={igIcon}
          />
        </Link>

        <div className="flex flex-col items-center ">
          <input
            onClick={() => {
              setShowSearch(true);
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            className="bg-gray-100 rounded-lg p-1 w-[250px] sm:w-[300px] "
            placeholder=" Search"
            type="text"
          />

          {results.length > 0 && showSearch && (
            <ul className="flex flex-col gap-2 mt-10 z-20 border boder-black p-3 rounded-2xl shadow-lg absolute  bg-white w-[300px]">
              {results.map((u) => (
                <Link key={u.username} to={`/profile/${u.username}`}>
                  <div
                    onClick={handleResultClick}
                    className="flex gap-2 bg-white  rounded-2xl items-center"
                  >
                    <img
                      alt={u.username}
                      className="rounded-full object-cover shadow aspect-ratio: auto; w-12 h-12"
                      src={u.photoURL}
                    />
                    <li> {u.username}</li>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        onClick={() => {
          setShowSearch(false);
        }}
        className="flex justify-center items-center"
      >
        {children}
      </div>

      {/* BOTTOM NAV */}
      <nav className="block p-2 fixed inset-x-0 bottom-0 z-10 border shadow-lg  bg-white w-screen    md:hidden ">
        <div className="flex justify-around items-center ">
          <Link to="/feed">
            <img
              onClick={handleBottomHome}
              alt="Homepage feed"
              className="object-cover active:scale-100 aspect-ratio:square  w-8 h-8 sm:w-10 sm:h-10"
              src={homepageIcon}
            />
          </Link>

          <div>
            <Link to={"/upload"}>
              <img
                alt="upload"
                className="object-cover active:scale-100 aspect-ratio:square  w-8 h-8 sm:w-10 sm:h-10"
                src={uploadIcon}
              />
            </Link>
          </div>

          <div>
            <Link to={`/profile/${userData.username}`}>
              {userData && (
                <img
                  className="rounded-full active:scale-105 object-cover aspect-ratio: auto; w-10 h-10"
                  alt="profile"
                  src={userData.photoURL}
                />
              )}
            </Link>
          </div>

          <div
            className="rounded text-white text-center font-bold btn p-2 bg-blue-400 hover:bg-blue-700 active:scale-90"
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
