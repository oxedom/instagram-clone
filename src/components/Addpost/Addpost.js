import { useState } from "react";

const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postBio, setBio] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert()
  };

  return (
    <div>

      <h1> Add a post </h1>
      <form onSubmit={handleSubmit} className="border p-1 bg-black flex gap-4 flex-col">
      

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
            value={postBio}
            type="text"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></input>
      <button className="btn bg-slate-50"  type="submit"> Click me </button>
      </form>
    </div>
  );
};

export default Addpost;
