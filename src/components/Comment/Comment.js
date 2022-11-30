import ShowMoreText from "react-show-more-text";

import { Link } from "react-router-dom";
const Comment = (props) => {
  const { text, username, date } = props.commentData;

  return (
    <div className={`flex  gap-1`}>
      <Link to={`/profile/${username}`}>
        <span className="font-semibold"> {username} </span>
      </Link>

      <div className="">
        <ShowMoreText
          more="show more"
          less="show less"
          className=""
          anchorClass="hover:underline text-gray-500 "
          width={300}
          lines={1}
        >
          {" "}
          {text}{" "}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default Comment;
