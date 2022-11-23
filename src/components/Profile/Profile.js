import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useUser } from "../../services/useUser";
import {usePost} from "../../services/usePost";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
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
      // const uid = JSON.parse(localStorage.getItem(userInfo)).uid
      const postData = await getAllUserPosts(auth.currentUser.uid)
      const userData = await getUserbyId(auth.currentUser.uid)
      setUserPosts(postData)
      setUserInfo(userData)

      console.log(postData);
    } 
    fetchData()
  }, [])

  return (
    <div>
      <h1> Hello from Profile</h1>
      <div className="m-12 flex items-center justify-center">
      <PhotoGrid posts={userPosts}> </PhotoGrid>
      </div>

    </div>
  );
};

export default Profile;


