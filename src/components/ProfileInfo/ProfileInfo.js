import { Link } from "react-router-dom";
import threeDots from "../../assests/dots.png";
import anonymousProfile from "../../assests/emptyUser.png";
import { UserService } from "../../services/UserService";

const ProfileInfo = (props) => {
  const { isFollowing, setIsFollowing, myAccount, posts, loading } = props;

  const { photoURL, username, bio, following, followers, uid } =
    props.profileData;

  const userAPI = UserService();

  const handleFollow = async () => {
    if (isFollowing) {
      setIsFollowing(false);
      followers.pop();
    } else {
      followers.push("fakeFollower");
      setIsFollowing(true);
    }
    //Sending the current UID of the users profile
    userAPI.toogleFollow(uid);
  };

  return (
    <>
      {!loading && (

      
        <div className="mt-5 flex flex-col">
          <div className="m-4 grid grid-cols-2  items-center   ">
            {/* profile Pictutre */}
            {photoURL && (
              <img
                className="rounded-full object-cover aspect-ratio: auto; w-20 h-20 md:w-32 md:h-32"
                src={photoURL}
                alt="profile"
              />
            )}
     

            {/* Username and follow button */}
            <div className="grid grid-rows-2 gap-2 flex-col flex-grow-1   justify-center items-center">
              <div className="">
                <h1 className="font-meduim text-center text-xl md:text-2xl">
                  {" "}
                  {username}{" "}
                </h1>

                {myAccount && <div className="flex items-center"></div>}
              </div>

              {!myAccount && isFollowing && (
                <div
                  onClick={handleFollow}
                  className="button flex justify-center p-0.5  w-[100px] rounded border-2 border-slate-300 hover:cursor-pointer"
                >
                  <span className="font-medium"> Following </span>
                </div>
              )}

              {!myAccount && !isFollowing && (
                <div
                  onClick={handleFollow}
                  className="button border flex justify-center p-0.5 rounded w-[100px] text-white bg-blue-500  text-center hover:cursor-pointer"
                >
                  <span className="font-medium"> Follow </span>
                </div>
              )}

              {myAccount && (
                <Link to={`/profile/${username}`}>
                  <div className="button flex justify-center p-0.5  w-[100px] rounded border-2 border-slate-300 hover:cursor-pointer">
                    <span className="font-size"> Your Profile </span>
                  </div>
                </Link>
              )}
            </div>
          </div>







          <p className="m-4 font-semibold" alt="bio">
            {" "}
            {bio}{" "}
          </p>
          <hr></hr>

          <div className="grid grid-cols-3 mt-3 mb-3">
            <div className="flex flex-col justify-center items-center">
              <span className="text-sm font-semibold"> {posts.length} </span>
              <span className="text-sm"> posts </span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-sm font-semibold">
                {" "}
                {followers.length}{" "}
              </span>
              <span className="text-sm"> followers </span>
            </div>

            <div className="flex flex-col justify-center items-center ">
              <span className="text-sm font-semibold">
                {" "}
                {following.length}{" "}
              </span>
              <span className="text-sm"> following </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
