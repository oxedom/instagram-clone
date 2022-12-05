import { useState } from "react";

import imageGallery from "../../assests/image-gallery.png";
import { PostService } from "../../services/PostService";
import UploadButton from "../UploadButton/UploadButton";
const Addpost = () => {
  const [postText, setPostText] = useState("");
  const postApi = PostService();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(selectedImage) {
      const doc = await postApi.postPost(selectedImage, postText);
    }

  };

  const handleRemove = (e) => {
    setSelectedImage(null);
  };

  return (
    <>
      {" "}
      {!loading && (
        <div className="flex justify-center items-center  m-2 ">
          <form
            onSubmit={handleSubmit}
            className=" rounded-lg bg-white shadow-sm flex gap-4 p-10 flex-col"
          >
            {selectedImage && (
              <div
                className="bg-red-400 hover:bg-red-500 p-2 rounded text-center order-2 text-white  "
                onClick={handleRemove}
              >
                {" "}
                Remove{" "}
              </div>
            )}
            <label for="files" className="btn w-[250px] flex justify-center  ">
              {selectedImage && (
                <div className="flex flex-col gap-2  p-1">
                  <img
                    width={250}
                    className="shadow-lg rounded"
                    alt="user upload"
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
              )}
            <div>
            {!selectedImage && <div className="flex flex-col gap-3 hover:cursor-pointer">
        
                <img
                  width={150}
                  src={imageGallery}
                  alt="upload button"
                  className="w-[150px]  "
                />
                
     


             <div className="w-50 bg-blue-500 rounded-md  text-white text-center p-1 "> Select from device </div>
            </div> }
              
            </div>  

            </label>
            <div className="hidden">
              <UploadButton
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              ></UploadButton>
            </div>

            {selectedImage &&<  textarea
              className="bg-slate-50 p-2 border-2 border-gray-100"
              maxLength={250}
              placeholder="Post description "
              value={postText}
              type="text"
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            ></textarea> }
              {selectedImage && <button
              className="btn bg-blue-400 rounded p-2 text-white  hover:bg-blue-500"
              type="submit"
            >
              {" "}
              Post Post!{" "}
            </button> }
          </form>
        </div>
      )}
    </>
  );
};

export default Addpost;
