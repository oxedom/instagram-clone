import { useState } from "react";
import { usePost } from "../../services/usePost";

const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postText, setPostText] = useState("");
  const postApi = usePost();

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
    <div className="flex-grow gap-3 flex justify-center flex-col items-center ">
      <form
        onSubmit={handleSubmit}
        className="border p-10 rounded bg-slate-200  flex gap-4 flex-col"
      >
        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          placeholder="Image URL"
          maxLength={250}
          value={imgUrl}
          type="text"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>

        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          maxLength={250}
          placeholder="Post description "
          value={postText}
          type="text"
          onChange={(e) => {
            setPostText(e.target.value);
          }}
        ></input>
        <button className="btn bg-slate-50" type="submit">
          {" "}
          Click me{" "}
        </button>
      </form>
    </div>
  );
};

export default Addpost;
