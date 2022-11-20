
 import {useState } from "react";

import Post from "../Post/Post";


const Feed = () => {
  //eslint-disable-next-line
  const [posts, setPosts ] = useState([])


  return (
    <div className="bg-slate-50 flex-grow gap-3 flex justify-center flex-col items-center">
      {posts.map(p => <Post props={p}> </Post>)}
    </div>
  );
};

export default Feed;
