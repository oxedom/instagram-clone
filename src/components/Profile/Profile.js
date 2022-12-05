import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { PostService } from "../../services/PostService";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useNavigate, useParams } from "react-router";
import { auth } from "../../firebase";
import ProfileSkeleton from "../Skeletons/ProfileSkeleton";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const { getUserbyId, getUserByUsername } = UserService();
  const { getAllUserPosts } = PostService();
  const { username } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ followers: [], following: [] });

  const [loading, setLoading] = useState(false);
  const [myAccount, setMyAccount] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchData = useCallback(async () => {
    setMyAccount(false);
    setIsFollowing(false);
  
    setLoading(true);
    const user = await getUserByUsername(username);

    //If not user renavigate to to /
    if (user === undefined) {
      navigate("/");
    }
    const userData = await getUserbyId(user.uid);
    const postData = await getAllUserPosts(user.uid);
    setUserInfo(userData);
    setUserPosts(postData);

    onAuthStateChanged(auth,(u) => {

      if (u.uid === user.uid) {
        setUserInfo({ ...userData, ...u.uid});
        setMyAccount(true);
      }

      if (userData.followers.includes(u.uid)) {
        setIsFollowing(true);
      }


    })
 


    setLoading(false);
    //  eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <div className="flex flex-col ">
      {loading && <ProfileSkeleton></ProfileSkeleton> }


      {!loading && (
        <div className="justify-self-center w-[350px] sm:w-[700px] md:w-[800px] lg:w-[1000px]">
          <div className="flex  flex-col">
            <ProfileInfo
              setIsFollowing={setIsFollowing}
              isFollowing={isFollowing}
              myAccount={myAccount}
              posts={userPosts}
              loading={loading}
              profileData={userInfo}
            ></ProfileInfo>
            <PhotoGrid posts={userPosts}> </PhotoGrid>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Profile;
