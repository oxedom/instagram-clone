import { Link } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";

const Post = (props) => {

    const {url, text, uid, likes} = props.props
    const temp = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

    return ( <div className="flex flex-col  shadow-md border-solid m-5">
        
        <div className="bg-white p-4 rounded-lg"> 
 
        <div className="flex items-center gap-2 align-center ">
   
        <img className="rounded-full object-cover aspect-ratio: auto; w-10 h-10 " alt='profile of user' src={temp} />
        <Link className="self-center font-medium "> {uid} </Link> 
        </div>
    
    
        </div>
        <img className="object-fit w-96 md:w-96 " alt={text }src={url} /> 
        <PostButtons props={{likes, uid, text}}> </PostButtons>
        
    </div >  );
}
 
export default Post;