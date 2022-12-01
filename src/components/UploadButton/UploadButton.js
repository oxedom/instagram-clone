

const UploadButton = (props) => {
  const { selectedImage, setSelectedImage } = props;


  const handleInputUpload = (e) => {
    alert(e.target.files[0].name)
    e.preventDefault();

    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (

      <div>
      <input
      className=""
      id="files"
        key={selectedImage}
        type="file"
        title="Upload Photo"
        accept="image/png, image/gif, image/jpeg"
        name="myImage"
        onChange={handleInputUpload}
      />
      </div>

  );
};

export default UploadButton;
