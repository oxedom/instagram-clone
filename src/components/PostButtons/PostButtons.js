import unlike from "../../assests/heart.png";
import liked from "../../assests/darkheart.png";
import commment from "../../assests/comment.png";

import { useEffect, useState } from "react";

const PostButtons = (props) => {
  const [likedState, setLikedState] = useState(unlike);

  const handleLike = () => {
    if (likedState === liked) {
      setLikedState(unlike);
    } else {
      setLikedState(liked);
    }
  };
  useEffect(() => {
    if (true) {
      setLikedState(liked);
    }
  }, []);
  const { url, text, uid, likes, username } = props.props;

  return (
    <div className="bg-white ">
      <div className="p-2 flex flex-col gap-3 ">
        <ul className="flex gap-4 object-contain w-14 mt-2">
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
        <div className="flex gap-2">
          <p className="font-semibold "> {username} </p> <span> {text} </span>
        </div>
      </div>
    </div>
  );
};

export default PostButtons;
