import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commmentIcon from "../../assests/comment.png";
import Comment from "../Comment/Comment";
import { useEffect, useState, useRef} from "react";
import { PostService } from "../../services/PostService";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const PostButtons = (props) => {
  const { text, likes, username, date, id, comments } = props.postData;
  const [amountOfLikes, setAmountOfLikes] = useState(1)
  const [localComments, setLocalComments] = useState([]);
  const postApi = PostService();
  const [likedState, setLikedState] = useState(false);
  const [textColor, setTextColor] = useState("text-blue-200");

  const [formatedDate, setFormated] = useState("");
  const [commentText, setComment] = useState("");
  const inputRefContainer = useRef(null)

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
      postApi.addComment(id, commentText);
      setLocalComments((prev) => [
        ...prev,
        { text: commentText, username: user.displayName},
      ]);
    })
    setComment("");
  };

  const handleCommentButton = () => {inputRefContainer.current.focus()}

  const handleLike = () => {
  
    postApi.tooglelikePost(id);
    if(likedState) { setLikedState(false)}
    else { setLikedState(true)}
  };

  useEffect(() => {
    if (commentText.length > 1) {
      setTextColor("text-blue-400");
    } else {
      setTextColor("text-blue-200");
    }
  }, [commentText]);





  useEffect(() => {
    setAmountOfLikes(likes.length)
    setLocalComments(comments);
    onAuthStateChanged(auth, (user) => 
    {
      if (likes.some((l) => l.uid === user.uid)) {setLikedState(true);}
    })
  
  }, [likes]);

  useEffect(() => {
    const today = new Date();
    const dateInWords = formatDistance(date, today.getTime());

    setFormated(dateInWords);
  }, [date]);

  return (
    <div className="bg-white flex flex-col overflow-hidden  ">
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
            <img onClick={handleCommentButton}
              alt="comment"
              className="hover:cursor-pointer"
              src={commmentIcon}
            />{" "}
          </li>
        </ul>
        {<p> TOo many likes </p>}

        <div className="flex gap-1">
          <Link to={`/profile/${username}`}>
            <p className="font-semibold flex gap-2 "> {username}</p>{" "}
          </Link>

          <p className=""> {text} </p>
        </div>
        <div>
          <p className="text-sm text-slate-400 p-0.5"> {formatedDate} ago </p>
        </div>
      </div>
      <div className="mb-2">
        {localComments.map((c) => {
          return (
            <Comment key={c.date} commentData={c}>
              {" "}
            </Comment>
          );
        })}
      </div>

      <hr></hr>
      <form onSubmit={handleCommentSubmit} className="rounded flex">
        <input
          ref={inputRefContainer}
          maxLength={250}
          className="p-3 flex-grow"
          value={commentText}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          placeholder="Add a comment"
        ></input>
        <button
          alt="submit"
          type="submit"
          className={"btn rounded font-bold bg-white m-1 p-1 " + textColor}
        >
          {" "}
          Post{" "}
        </button>
      </form>
    </div>
  );
};

export default PostButtons;
