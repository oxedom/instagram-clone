import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commment from "../../assests/comment.png";

import { useEffect, useState } from "react";
import { usePost } from "../../services/usePost";

const PostButtons = (props) => {
  const { url, text, uid, likes, username, Date, id} = props.props;

  const postApi = usePost();
  const [likedState, setLikedState] = useState(unlike);
  const [formatedDate, setFormated] = useState("");
  const [comment, setComment] = useState("")

  const handleCommentSubmit = (e) => 
  { 
e.preventDefault()
  }

  const handleLike = () => {
    postApi.likePost(id)
    // if (likedState === liked) {
    //   setLikedState(unlike);
    // } else {
    //   setLikedState(liked);
    // }
  };

  useEffect(() => {
    //hard coded
    if (true) {
      setLikedState(liked);
    }
  }, []);

  return (
    <div className="bg-white flex flex-col  ">
      <div className="p-2 flex flex-col ">
        <ul className="flex gap-4 object-contain w-14 mt-2 ">
          <li>
            {" "}
            <img onClick={handleLike} src={likedState} />{" "}
          </li>
          <li>
            {" "}
            <img src={commment} />{" "}
          </li>
        </ul>
        <p> {likes.length} likes </p>
        <div className="flex gap-1">
          <p className="font-semibold flex gap-2"> {username}</p>{" "}
          <p> {text} </p>
        </div>
        <div>
          <p> {Date} </p>
        </div>
      </div>

      <hr></hr>
      <form onSubmit={handleCommentSubmit}className="rounded flex">
        <input className="p-3 flex-grow" value={comment} onChange={(e) => {setComment(e.target.value)} } type="text" placeholder="Add a comment"></input>
        <button alt="submit" type='submit' className="btn rounded  text-white font-bold bg-blue-300 m-1 p-1"> Add </button>
      </form>
    </div>
  );
};

export default PostButtons;
