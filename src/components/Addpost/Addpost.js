import { useState } from "react";
import { usePost } from "../../services/usePost";

const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postText, setPostText] = useState("");
  const postApi = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(imgUrl, postText);
    postApi.postPost(postText, imgUrl);
    setPostText("");
    setUrl("");
  };

  return (
    <div>
      <h1> Add a post </h1>
      <form
        onSubmit={handleSubmit}
        className="border p-1 bg-black flex gap-4 flex-col"
      >
        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          placeholder="img"
          value={imgUrl}
          type="text"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>

        <input
          className="bg-slate-50 p-2 border-2 border-gray-100"
          placeholder="Bio"
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
