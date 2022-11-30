import { useState } from "react";
import { PostService } from "../../services/PostService";
import UploadButton from "../UploadButton/UploadButton";
const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postText, setPostText] = useState("");
  const postApi = PostService();

  function isImgUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isImgUrl(imgUrl)) {
      postApi.postPost(postText, imgUrl);
      setPostText("");
      setUrl("");
    }
  };

  return (
    <div  className="flex-grow-1 flex justify-center items-center mt-32">

      <form
        onSubmit={handleSubmit}
        className="border rounded bg-slate-200 flex gap-4 p-5 flex-col"
      >
        <UploadButton></UploadButton>


        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          maxLength={250}
          placeholder="Post description "
          value={postText}
          type="text"
          onChange={(e) => {setPostText(e.target.value); }}
        ></input>
        <button className="btn bg-slate-50" type="submit">
          {" "}
          Post Post!{" "}
        </button>
      </form>
    </div>
  );
};

export default Addpost;
