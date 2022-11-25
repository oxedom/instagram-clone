import Post from "../Post/Post";
import { usePost } from "../../services/usePost";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";



const PostPage = () => {
  const params = useParams()
  const postAPI = usePost()
  const [post, setPost] = useState({})
  
  const fetchData = useCallback(async () => {
    setPost({})
    const data = await postAPI.getPostByID(params.post_id)

    setPost(data)
  }, [])

  useEffect(() => 
  { 
    
    fetchData()
    
  },[])

  return <div>
    <Post props={post}> </Post>
   </div>;
};

export default PostPage;
