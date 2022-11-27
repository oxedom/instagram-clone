import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../services/useUser";
import {usePost} from "../../services/usePost";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useParams } from "react-router";
import {onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'


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
      

      onAuthStateChanged(auth, async (u) => 
      {

        if(u.uid === user.uid) 
        {
     
          setUserInfo({...userData, ...u})
          setMyAccount(true)
        }

        if(userData.followers.includes(u.uid)) 
        {
          setIsFollowing(true)
        }
      })









  

      setLoading(false)
      //  eslint-disable-next-line
   }, [username])

  
  
   useEffect(() => 
   { 
    fetchData()
   }, [fetchData])


  return (
    <div className="lg:ml-28 lg:mr-28 xl:ml-48 xl:mr-48 2xl:mr-96 2xl:ml-96">
      {!loading &&
      <div className="flex flex-col">
      <ProfileInfo setIsFollowing={setIsFollowing} isFollowing={isFollowing} myAccount={myAccount} posts={userPosts} profileData={userInfo} ></ProfileInfo>
      <PhotoGrid posts={userPosts}> </PhotoGrid>
      </div>
}
    </div>
  );
};

export default Profile;


