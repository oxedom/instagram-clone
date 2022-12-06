import Comment from "../Comment/Comment";
import { formatDistance } from "date-fns";
import { PostService } from "../../services/PostService";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const CommentSection = (props) => {
  const {  date, id, comments } = props.postData;
  const commentRef = props.commentRef


  const postApi = PostService();
  const [commentText, setComment] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [textColor, setTextColor] = useState("text-blue-200");
  const [formatedDate, setFormated] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    

      postApi.addComment(id, commentText);
      setAllComments((prev) => [
        ...prev,
        { text: commentText, username: auth.currentUser.displayName },
      ]);
 
    setComment("");
  };

  const handleShowMore = () => {
    setAllComments(comments);
    setViewAll(true);
  };

  useEffect(() => {
    const fewComments = comments.slice(comments.length - 3);
    setAllComments(fewComments);
    if (comments.length <= 3) {
      setViewAll(true);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const dateInWords = formatDistance(date, today.getTime());

    setFormated(dateInWords);
  }, [date]);

  useEffect(() => {
    if (commentText.length > 1) {
      setTextColor("text-blue-400");
    } else {
      setTextColor("text-blue-200");
    }
  }, [commentText]);

  return (
    <div>
      {!viewAll && (
        <div className="flex items-center " onClick={handleShowMore}>
          <p className="text-gray-500"> View all {comments.length} comments </p>
        </div>
      )}
      <div className="flex flex-col gap-1 ">
        {allComments.map((c) => {
          return (
            <Comment key={c.date + Math.random(30)} commentData={c}>
              {" "}
            </Comment>
          );
        })}
      </div>

      <div>
        <p className="text-sm text-slate-400 p-0.5"> {formatedDate} ago </p>
      </div>

      <hr></hr>
      <form onSubmit={handleCommentSubmit} className="rounded flex">
        <input
          maxLength={250}
          className="p-3 flex-grow"
          ref={commentRef}
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

export default CommentSection;
