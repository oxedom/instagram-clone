import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../services/useUser";
import {usePost} from "../../services/usePost";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useParams } from "react-router";
import { getAuth } from "firebase/auth";


const Profile = () => {

  const {getUserbyId, getUserByUsername} = useUser()
  const { getAllUserPosts} = usePost()
  const {username } = useParams()
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({followers: [], following:[]});
  const [loading , setLoading] = useState(false)
  const [myAccount, setMyAccount] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)


  const fetchData =  useCallback(async () => 
   {
    const user = await getUserByUsername(username)

      const userData = await getUserbyId(user.uid)
      const postData = await getAllUserPosts(user.uid)
      setUserInfo(userData)
      setUserPosts(postData)
      if(user.uid === JSON.parse(localStorage.getItem('userInfo')).uid) 
      {
        setMyAccount(true)
      }


      const currentUserLoggedIn = getAuth()
      //Sets following button to following or Follow
      if(userData.following.includes(currentUserLoggedIn.currentUser.uid)) 
      {
        isFollowing(true)
      }
  

      setLoading(false)
      //  eslint-disable-next-line
   }, [username])

  
   useEffect(() => 
   { 
    fetchData()
   }, [fetchData])



      


  return (
    <div className="">
      {!loading &&
      <div className="flex flex-col">
      <ProfileInfo setIsFollowing={setIsFollowing} isFollowing={isFollowing} myAccount={myAccount} posts={userPosts} props={userInfo} ></ProfileInfo>
      <PhotoGrid posts={userPosts}> </PhotoGrid>
      </div>
}
    </div>
  );
};

export default Profile;


