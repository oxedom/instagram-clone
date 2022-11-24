import { useCallback, useEffect, useState } from "react";
import Post from "../Post/Post";
import { useUser } from "../../services/useUser";
import { usePost } from "../../services/usePost";
import Addpost from "../Addpost/Addpost";

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
      //Get the user id from localstorage
      const uid = JSON.parse(localStorage.getItem("userInfo")).uid;
      //Fetch his info and get all of his followers ids
      const user = await getUserbyId(uid);
      //Fetch their posts and set them as posts on the feed
      user.following.forEach(async (f) => {
        //Query the person he is followings data to get his username and profile picture;
        const followerData = await getUserbyId(f);
        const { username, profileUrl } = followerData;
        //Get each following users posts
        const posts = await getAllUserPosts(f);
        //Update all of the users posts with his username and profile img URL
        const updatedPosts = posts.map((obj) => ({
          ...obj,
          username,
          profileUrl,
        }));
        //Setting the posts state to the newly fetched posts whilst keeping the previous kept posts
        setPosts((prev) => {
          return [...prev, ...updatedPosts];
        });
      });


  },[])


  useEffect(() => {
    //Resets Posts array so no stale data or rerenders duplicate the amount of posts
    setPosts([]);



    //Init for fetch data function;
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map((p) => (
        <Post key={p.id} props={p}>
          {" "}
        </Post>
      ))}
      <Addpost></Addpost>
    </div>
  );
};

export default Feed;
