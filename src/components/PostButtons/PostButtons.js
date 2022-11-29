import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commmentIcon from "../../assests/comment.png";
import { useEffect, useState} from "react";
import { PostService } from "../../services/PostService";
import { Link } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const PostButtons = (props) => {


  const { text, likes, username, date, id, comments } = props.postData;
  const [amountOfLikes, setAmountOfLikes] = useState([])

  const postApi = PostService();
  const [likedState, setLikedState] = useState(false);



  const handleLike = () => {
  
    postApi.tooglelikePost(id);
    if(likedState) { 
      setLikedState(false)
      amountOfLikes.pop('fakeLike')
      
    }
    else {
      amountOfLikes.push('fakeLike')
      setLikedState(true)}
  };



  useEffect(() => {
    setAmountOfLikes([...likes])
    onAuthStateChanged(auth, (user) => 
    {
      if (likes.some((l) => l.uid === user.uid)) {
        setLikedState(true);}
    })
  
  }, [likes]);


  return (
    <div className="bg-white flex flex-col overflow-hidden   ">
      <div className="p-2 flex flex-col ">
        <ul className="flex gap-4 object-contain w-14 mt-2 ">
          <li>
            {" "}
            <img
              onClick={handleLike}
              alt="like"
              className="hover:cursor-pointer"
              src={likedState ? liked : unlike}
            />{" "}
          </li>
          <li>
            {" "}
            <img 
              alt="comment"
              className="hover:cursor-pointer"
              src={commmentIcon}
            />{" "}
          </li>
        </ul>
        {<p>
        {amountOfLikes.length} likes </p>}

        <div className="flex gap-1">
          <Link to={`/profile/${username}`}>
            <p className="font-semibold flex gap-2 "> {username}</p>{" "}
          </Link>

          <p className=""> {text} </p>
        </div>


        <CommentSection  postData={{text, likes, username, date, id, comments}}> </CommentSection>
      </div>

      
    </div>
  );
};

export default PostButtons;
