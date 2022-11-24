import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commment from "../../assests/comment.png";

import { useEffect, useState } from "react";
import { usePost } from "../../services/usePost";

const PostButtons = (props) => {
  const { text, likes, username, date, id } = props.props;
  console.log(props);

  const postApi = usePost();
  const [likedState, setLikedState] = useState(unlike);
  const [formatedDate, setFormated] = useState("");
  const [comment, setComment] = useState("");
  const userObj = JSON.parse(localStorage.getItem("userInfo"));
  const [amountOfLikes, setAmountOfLikes] = useState([])


  const handleCommentSubmit = (e) => {
    e.preventDefault();
  };

  const handleLike = () => {
    
    

    postApi.tooglelikePost(id);
    if (likedState === liked) {
      setAmountOfLikes(prev => { return (prev-1)})
      setLikedState(unlike);
    } else {

      setAmountOfLikes(prev => (prev+1))
      
      setLikedState(liked);
    }
  };

  useEffect(() => {
    setAmountOfLikes(likes.length)

    if (likes.some((l) => l.uid === userObj.uid)) {
      setLikedState(liked);
    }
  }, [likes, userObj.uid]);

  useEffect(() => {
    const d = new Date(date);

    const formated = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;

    setFormated(formated);
  }, [date]);

  return (

    <div className="bg-white flex flex-col  ">
      <div className="p-2 flex flex-col ">
        <ul className="flex gap-4 object-contain w-14 mt-2 ">
          <li>
            {" "}
            <img onClick={handleLike} alt="like" src={likedState} />{" "}
          </li>
          <li>
            {" "}
            <img alt="comment" src={commment} />{" "}
          </li>
        </ul>
        {(!amountOfLikes == 0) && 
            <p> {amountOfLikes} likes </p>
        }
    
        <div className="flex gap-1">
          <p className="font-semibold flex gap-2"> {username}</p>{" "}
          <p> {text} </p>
        </div>
        <div>
          <p> {formatedDate} </p>
        </div>
      </div>

      <hr></hr>
      <form onSubmit={handleCommentSubmit} className="rounded flex">
        <input
          className="p-3 flex-grow"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          placeholder="Add a comment"
        ></input>
        <button
          alt="submit"
          type="submit"
          className="btn rounded  text-white font-bold bg-blue-300 m-1 p-1"
        >
          {" "}
          Add{" "}
        </button>
      </form>
    </div>
  );
};

export default PostButtons;
