import { useState } from "react";

const UploadButton = (props) => {
  const { selectedImage, setSelectedImage } = props;


  const [removeButton, setRemoveButton] = useState(false);

  const handleRemove = (e) => {
    e.preventDefault();
    setRemoveButton(false);

    setSelectedImage(null);
  };

  const handleInputUpload = (e) => {
    e.preventDefault();
    setRemoveButton(true);

    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <form className="   " >
      <div>

 
      <input
      className=""
      id="files"
        key={selectedImage}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="myImage"
        onChange={handleInputUpload}
      />


      </div>

  
    </form>
  );
};

export default UploadButton;
