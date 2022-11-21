import { Link } from "react-router-dom";

import PostButtons from "../PostButtons/PostButtons";

const Post = (props) => {
  const { imgUrl, text, uid, likes } = props.props;

  return (
    <div className="flex flex-col  shadow-md border-solid m-5">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 align-center ">
          <img
            className="rounded-full object-cover aspect-ratio: auto; w-10 h-10 "
            alt="profile of user"
            src={imgUrl}
          />
          <Link className="self-center font-medium "> {uid} </Link>
        </div>
      </div>
      <img className="object-fit w-96 md:w-96 " alt={text} src={imgUrl} />
      <PostButtons props={{ likes, uid, text }}> </PostButtons>
    </div>
  );
};

export default Post;
