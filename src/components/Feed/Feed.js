import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useUser } from "../../services/useUser";
import { usePost } from "../../services/usePost";

const Feed = () => {
  //eslint-disable-next-line
  const userApi = useUser();
  const postApi = usePost();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //Get the user id from localstorage
    //Fetch his info and get all of his followers ids
    //Fetch their posts and set them as posts on the feed

    async function fetchData() {
      // const users = await userApi.getAllUsers()

      // setUsers(users)
      // console.log(users);
      const posts = await postApi.getAllFollowingPosts(
        "Rt3Ip4TI8XdkHNSfr3y99TznQMF3"
      );
      console.log(posts);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map((p) => (
        <Post props={p}> </Post>
      ))}
    </div>
  );
};

export default Feed;
