import { Link, useNavigate } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";
import backIcon from "../../assests/backicon.png"
import {  useState } from "react";

import { PostService } from "../../services/PostService";

const Post = (props) => {


  const postApi = PostService()



  const navigate = useNavigate()
  const [tempSize, setTempSize] = useState({width: "450", height: "680"})
  const [landscape, setLandscape] = useState("")

  const handleBack = () => { navigate(-1)}

  const handleLoad = (e) => {
    let height = e.naturalHeight
    let width = e.naturalWidth


    if(width <= height) { 
      //Portarit mode
      setLandscape("max-w-[450px]")}
 
      
    if(width >= height) { 

      setTempSize({width: "680", height: "450"})
      setLandscape("max-w-[650px]")}
   
  }


  const { imgUrl, text, uid, likes, username, id, date, photoURL, comments } =
    props.postData;

  const postPage = props.postPage;


  return (
    <div className={`${landscape}` }>
    <div className={`flex flex-col shadow-md border-solid m-3 rounded`}>


      <div className="bg-white p-4 rounded-lg flex gap-2 ">
        {postPage && <div onClick={handleBack}>  <img alt='back' className="w-10 h-10 aspect-auto object bg-cover" src={backIcon} /> </div> }
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


   
        <img  width={tempSize.width} height={tempSize.height}  alt={text} src={imgUrl} onLoad={(e) => {handleLoad(e.target)}} />
      
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
