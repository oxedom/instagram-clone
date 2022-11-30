import Post from "../Post/Post";
import { useParams } from "react-router";
import { PostService } from "../../services/PostService";
import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import PostSkeleton from "../../Skeletons/PostSkeleton";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState(false);
  const { getPostByID } = PostService();
  const { getUserbyId } = UserService();

  const fetchPostData = useCallback(async () => {
    const postData = await getPostByID(params.post_id);
    const userData = await getUserbyId(postData.uid);
    const { photoURL, username } = userData;
    setPost({ ...postData, photoURL, username });
  }, [params.post_id]);

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {!post &&  <PostSkeleton></PostSkeleton>}
      {post && <Post postData={post}> </Post> }
    </div>
  );
};

export default PostPage;
