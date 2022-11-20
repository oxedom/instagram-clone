import { useState } from "react";

const Addpost = () => {
  const [imgUrl, setUrl] = useState("");
  const [postBio, setBio] = useState("");
  const handleSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input> </input>
        <input> </input>
      </form>
    </div>
  );
};

export default Addpost;
