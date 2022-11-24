import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useUser } from "../../services/useUser";
import {usePost} from "../../services/usePost";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
const Profile = () => {

  const {getUserbyId} = useUser()
  const { getAllUserPosts} = usePost()

  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => 
  {
    setUserPosts([])

    const fetchData = async () => 
    {
      //Fetchs userinfo and posts and sets the state to that ata
      
      let uid = auth.currentUser.uid


      const postData = await getAllUserPosts(uid)
      const userData = await getUserbyId(uid)
      setUserPosts(postData)
      setUserInfo(userData)

      console.log(postData);
    } 
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex flex-col">
      <ProfileInfo posts={userPosts} props={userInfo} ></ProfileInfo>
      <PhotoGrid posts={userPosts}> </PhotoGrid>
      </div>

    </div>
  );
};

export default Profile;


