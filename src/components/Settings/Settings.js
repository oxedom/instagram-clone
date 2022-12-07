import { useState } from "react";
import UploadButton from "../UploadButton/UploadButton";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router";

import imageGallery from "../../assests/image-gallery.png";
const Settings = () => {

    const navigate = useNavigate()
    const [upload, setUpload] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const userAPI = UserService()
    const handleUpload = () => {
        setUpload(true)
        userAPI.updateProfilePicutre(selectedImage).then(() => 
        {
            navigate('/feed')
            navigate(0)
        })
    }


 return (<div className=" mt-10  shadow-md rounded-2xl">
    {!upload && 
 
        <div className="bg-white p-3 rounded-2xl">
        <label className="btn w-[250px]  bg-white p-10   flex flex-col items-center justify-center gap-5">
            <img src={imageGallery} 
            alt='upload'  width={200}
                    className="rounded"/> 
            <div className="invisible "> 
            <UploadButton setSelectedImage={setSelectedImage}></UploadButton>
            </div>
         
             </label>
      
             <div onClick={handleUpload}className="bg-blue-500 hover:bg-blue-600 p-3 w-120 text-white text-center rounded-lg"> Update profile </div>
        </div>
}
    </div> );
}
 
export default Settings;