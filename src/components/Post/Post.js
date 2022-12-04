import { Link } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";

import { useEffect, useState } from "react";

const Post = (props) => {

  const [tempSize, setTempSize] = useState({width: "450", height: "680"})
  const [landscape, setLandscape] = useState("")
  const handleLoad = (e) => {
    let height = e.naturalHeight
    let width = e.naturalWidth

    if(width < height) { 
      //Portarit mode
      setLandscape("max-w-[450px]")}
 
      
    if(width > height) { 

      setTempSize({width: "680", height: "450"})
      setLandscape("max-w-[650px]")}
   
  }


  const { imgUrl, text, uid, likes, username, id, date, photoURL, comments } =
    props.postData;

  return (
    <div className={`${landscape}` }>
    <div className={`flex flex-col shadow-md border-solid m-3 rounded`}>


      <div className="bg-white p-4 rounded-lg ">
        <div className="flex items-center gap-2 align-center  ">
          <img
            className="rounded-full object-cover  aspect-ratio: auto; w-10 h-10 "
            alt="profile of user"
            src={photoURL}
          />
          <Link
            to={`/profile/${username}`}
            className="self-center font-medium "
          >
            {" "}
            {username}{" "}
          </Link>
        </div>
      </div>

      <Link to={`/post/${id}`}>
        <img width={tempSize.width} height={tempSize.height}  alt={text} src={imgUrl} onLoad={(e) => {handleLoad(e.target)}} />
      </Link>
      <PostButtons
        postData={{ likes, uid, text, username, date, id, comments }}
      >
        {" "}
      </PostButtons>
    </div>
    </div>
  );
};

export default Post;
