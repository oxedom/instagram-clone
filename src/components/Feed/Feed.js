import { useCallback, useEffect, useState } from "react";
import Post from "../Post/Post";
import { useUser } from "../../services/useUser";
import { usePost } from "../../services/usePost";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Suggestions from "../Suggestions/Suggestions";


const Feed = () => {
  //eslint-disable-next-line

  const [posts, setPosts] = useState([]);

  //Functions from useEffect that allow the client to interact with the database through BL;
  const { getUserbyId } = useUser();
  //################################
  //Need to update this method to sort by posts and fetch post more efficently;
  const { getAllUserPosts } = usePost();



  const fetchData = useCallback(async () => 
  {
    //Resets Posts array so no stale data or rerenders duplicate the amount of posts
    setPosts([]);
      onAuthStateChanged(auth, async (userData) => 
      {
        if(userData) 
        {
          const user = await getUserbyId(userData.uid);
                //Fetch their posts and set them as posts on the feed
         const fetchPosts = await user.following.forEach(async (f) => {
  
        //Query the person he is followings data to get his username and profile picture;
        const followerData = await getUserbyId(f);
        const { username, photoURL} = followerData;
        console.log(followerData);
        
        const posts = await getAllUserPosts(f);
        
        //Update all of the users posts with his username and profile img URL

        const updatedPosts = posts.map((obj) => ({
          ...obj,
          username,
          photoURL,
        }));

        //Setting the posts state to the newly fetched posts whilst keeping the previous kept posts
        setPosts((prev) => {
          return [...prev, ...updatedPosts];
        });

      });

        }
      })


  },[])


  useEffect(() => {




    //Init for fetch data function;
    fetchData();
  }, []);

  return (
    <div>

      <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      <Suggestions></Suggestions>
      {posts.map((p) => (
        <Post key={p.id} postData={p} >
          {" "}
        </Post>
      ))}

    </div>
    </div>

  );
};

export default Feed;
