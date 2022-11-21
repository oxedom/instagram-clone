import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useUser } from "../../services/useUser";
import { usePost } from "../../services/usePost";
import Addpost from "../Addpost/Addpost";

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
      const uid = JSON.parse(localStorage.getItem('userInfo')).uid

      // setUsers(users)
      // console.log(users);
      const posts = await postApi.getAllPosts();
      console.log(posts);
      setPosts(posts)
    }
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map((p) => (
        <Post key={p.id} props={p}> </Post>
      ))}
  <Addpost></Addpost>
    </div>
  );
};

export default Feed;
