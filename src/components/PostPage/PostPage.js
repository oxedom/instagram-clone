import Post from "../Post/Post";
import { useParams } from "react-router";
import { usePost } from "../../services/usePost";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../services/useUser";

const PostPage = () => {
  const params = useParams()
  const [post, setPost] = useState(false)
  const {getPostByID} = usePost()
  const { getUserbyId} = useUser()

  const fetchPostData = useCallback(async () => {


    const postData = await getPostByID(params.post_id)
    const userData = await getUserbyId(postData.uid)
    const {photoURL, username } = userData
    setPost({...postData, photoURL, username} )
   

  }, [params.post_id])

  useEffect(() => {
    fetchPostData()

  }, [])

  return (
  <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
  {post && <Post props={post}> </Post> }
  </div>
  )

};

export default PostPage;
