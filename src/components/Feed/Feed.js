import { useCallback, useEffect, useState } from "react";
import Post from "../Post/Post";
import { UserService } from "../../services/UserService";
import { PostService } from "../../services/PostService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Suggestions from "../Suggestions/Suggestions";
import PostSkeleton from "../Skeletons/PostSkeleton";

const Feed = () => {
  //eslint-disable-next-line

  const [noPost, setNoPost] = useState(false)
  const [posts, setPosts] = useState([]);
  //Functions from useEffect that allow the client to interact with the database through BL;
  const { getUserbyId } = UserService();
  //################################
  //Need to update this method to sort by posts and fetch post more efficently;
  const { getAllUserPosts } = PostService();

  const fetchData = useCallback(async () => {
    //Resets Posts array so no stale data or rerenders duplicate the amount of posts
    setPosts([]);
  
    onAuthStateChanged(auth, async (userData) => {
      try {
        if (userData) {
          const user = await getUserbyId(userData.uid);
          //Fetch their posts and set them as posts on the feed
          if (user.following.length === 0) {
            setNoPost(true);
          }
          

          await user.following.forEach(async (f) => {
            //Query the person he is followings data to get his username and profile picture;
      
            const followerData = await getUserbyId(f);
            const { username, photoURL } = followerData;
            console.log(followerData);

            const posts = await getAllUserPosts(f);

            //Update all of the users posts with his username and profile img URL
            setTimeout(() => 
            {
              if(posts.length === 0) { setNoPost(true)}
            }, 3000)
            const updatedPosts = posts.map((obj) => ({
              ...obj,
              username,
              photoURL,
            }));

            //Setting the posts state to the newly fetched posts whilst keeping the previous kept posts
            setPosts((prev) => {
              return [...prev, ...updatedPosts];
       
            })
    
          })
          
          ;
        }
      } catch (error) {
        console.error(error);
      }

    });
  }, []);



  useEffect(() => {
    //Init for fetch data function;

    fetchData()
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 items-center">
        {(posts.length <=0 && !noPost) && [1,2,3].map((s) => { return <PostSkeleton key={s}></PostSkeleton>})}
        {posts.map((p) => (
          <Post key={p.id} postData={p}>
            {" "}
          </Post>
        ))}
        <div className="mt-10 "> </div>
        {noPost  && (
          <div className="m-10 text-xl flex flex-col justify-center items-center w-max h-96">
            <h1 className=""> There are posts available </h1>
            <p> Follow People to see their posts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
