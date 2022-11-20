
 import {useEffect, useState } from "react";
import { getUserbyId } from '../../services/useUser'
import Post from "../Post/Post";


const Feed = () => {
  //eslint-disable-next-line
  const [posts, setPosts ] = useState([])

  useEffect(() => {
    getUserbyId("rza8vM3Rz1MjesW8V216z7j8eLv2")

  }, [])
  
  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map(p => <Post props={p}> </Post>)}
    </div>
  );
};

export default Feed;
