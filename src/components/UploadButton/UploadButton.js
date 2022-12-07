const UploadButton = (props) => {
  const { setSelectedImage } = props;

  const handleInputUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <input
        id="files"
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
