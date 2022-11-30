import { tr } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import uploadIcon from '../../assests/plus.png'

const UploadButton = () => {
    
  function isImgUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  }
    const [selectedImage, setSelectedImage] = useState(null);
    const [imgError, setError] = useState(false)

    const handleRemove = () => { setSelectedImage(null)}

    const handleInputUpload = (e) => {
      setError(false)
      if(!isImgUrl(e.target.files[0].name)) 
      {
        setError(true)
        handleRemove()
      }
    
      console.log(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }


    return (
      <div className=' p-2 flex items-center justify-center flex-col'>
        {selectedImage && (
          <div className='flex items-center flex-col'>
          <img alt="NO IMAGE" className='flex items w-[250px]' src={URL.createObjectURL(selectedImage)} />

          <button className='p-1 bg-red-600 rounded-md text-white' onClick={handleRemove}>Remove</button>
   
          </div>
        )}
   
        <input
          type="file"
          name="myImage"
          onChange={handleInputUpload}
        />
        {imgError && <p className='text-center text-red-600 font-bold  '> The file you have choosen is not a image...  </p> }
      </div>
    );
  };
 
export default UploadButton
