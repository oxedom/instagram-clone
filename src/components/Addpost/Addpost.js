import { useState } from "react";
import { useNavigate } from "react-router";
import uploadIcon from '../../assests/uploadPhoto.png'
import { PostService } from "../../services/PostService";
import UploadButton from "../UploadButton/UploadButton";
const Addpost = () => {

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


  const handleRemove = (e) => { setSelectedImage(null);};

  return (
    <>
      {" "}
      {!loading && (
        <div className="flex justify-center items-cente m-32  ">
          <form
            onSubmit={handleSubmit}
            className="border rounded-lg bg-slate-200 flex gap-4 p-5 flex-col">
                {selectedImage &&  <div className="bg-red-400 hover:bg-red-500 p-2 rounded text-center "  onClick={handleRemove}> Remove </div> }     
              <label for="files" className="btn w-[250px] flex justify-center  ">
              {selectedImage &&  <div className="flex flex-col gap-2  p-1">
                <img alt="user upload" src={URL.createObjectURL(selectedImage)} />
   
                </div> }

              {!selectedImage && <img src={uploadIcon} alt='upload button' className='w-[150px] invert  ' /> }
              </label>
              <div className="hidden">
              <UploadButton
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            ></UploadButton>
              </div>
    

            <textarea
              className="bg-slate-50 p-2 border-2 border-gray-100"
              maxLength={250}
              placeholder="Post description "
              value={postText}
              type="text"
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            ></textarea>
            <button className="btn bg-blue-500 rounded p-2 hover:bg-blue-700" type="submit">
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
