import { useEffect, useRef, useState } from "react";

const UploadButton = (props) => {
  const { selectedImage, setSelectedImage } = props;
  function isImgUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  }

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
    <form className="flex  items-center gap-2 justify-between">
      <input
        key={selectedImage}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="myImage"
        onChange={handleInputUpload}
      />
      {removeButton && (
        <button
          className="p-1  bg-red-300 rounded-md text-white hover:bg-red-500"
          onClick={handleRemove}
        >
          Remove
        </button>
      )}
    </form>
  );
};

export default UploadButton;
