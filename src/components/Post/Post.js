import { Link } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";

const Post = (props) => {
  const { imgUrl, text, uid, likes, username, id, date, photoURL, comments } =
    props.postData;

  return (
    <div className="flex flex-col shadow-md border-solid m-3 rounded max-w-[450px]   ">
      <div className="bg-white p-4 rounded-lg ">
        <div className="flex items-center gap-2 align-center  ">
          <img
            className="rounded-full object-cover  aspect-ratio: auto; w-10 h-10 "
            alt="profile of user"
            src={photoURL}
            rel="preload"
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
        <img className="" alt={text} src={imgUrl} />
      </Link>
      <PostButtons
        postData={{ likes, uid, text, username, date, id, comments }}
      >
        {" "}
      </PostButtons>
    </div>
  );
};

export default Post;
