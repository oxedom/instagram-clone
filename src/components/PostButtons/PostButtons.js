import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commmentIcon from "../../assests/comment.png";
import Comment from "../Comment/Comment";
import { useEffect, useState } from "react";
import { usePost } from "../../services/usePost";
import { Link } from "react-router-dom";

const PostButtons = (props) => {
  const { text, likes, username, date, id, comments } = props.props;


  const [localComments, setLocalComments] = useState([])
  const postApi = usePost();
  const [likedState, setLikedState] = useState(unlike);
  const [formatedDate, setFormated] = useState("");
  const [commentText, setComment] = useState("");
  const userObj = JSON.parse(localStorage.getItem("userInfo"));


  const [textColor, setTextColor] = useState('text-blue-200')

  const handleCommentSubmit = (e) => {
    postApi.addComment(id, commentText)
    setLocalComments((prev) => [...prev, {text: commentText, username: userObj.displayName}])  
    e.preventDefault();
    setComment('')
  };

  const handleLike = () => {
    
    
// eslint-disable-next-line
    postApi.tooglelikePost(id);
    if (likedState === liked) {
      likes.pop('FAKELIKE')

      setLikedState(unlike);
    } else {

      likes.push('FAKELIKE')
      
      setLikedState(liked);
    }
  };

  useEffect(() => {
    if(commentText.length > 1) 
    {
      setTextColor('text-blue-400')
    } 
    else 
    {
      setTextColor('text-blue-200')
    }
  }, [commentText])

  // eslint-disable-next-line
  useEffect(() => {
    setLocalComments(comments)
   

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
            <img alt="comment" src={commmentIcon} />{" "}
          </li>
        </ul>
        {
            <p> {likes.length} likes </p>
        }
    
        <div className="flex gap-1">
          <Link to={`/profile/${username}`}>
          <p className="font-semibold flex gap-2"> {username}</p>{" "}
          </Link>

          <p> {text} </p>
        </div>
        <div>
          <p> {formatedDate} </p>

          
        </div>

        
      </div>
      <div className="mb-2">
      {localComments.map((c) => { return <Comment key={c.date} props={c}> </Comment>})}
      </div>
   


      <hr></hr>
      <form onSubmit={handleCommentSubmit} className="rounded flex">
        <input maxLength={80}
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
