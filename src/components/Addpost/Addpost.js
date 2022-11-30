import { useState } from "react";
import { useNavigate } from "react-router";

import { PostService } from "../../services/PostService";
import UploadButton from "../UploadButton/UploadButton";
const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postText, setPostText] = useState("");
  const postApi = PostService();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postApi.postPost(selectedImage, postText).then((docRef) => {
      navigate(`/post/${docRef.id}`);
    });
  };

  return (
    <>
      {" "}
      {!loading && (
        <div className="flex-grow-1 flex justify-center items-center mt-32">
          <form
            onSubmit={handleSubmit}
            className="border rounded bg-slate-200 flex gap-4 p-5 flex-col"
          >
            <UploadButton
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            ></UploadButton>

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
              Post Post!{" "}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Addpost;
