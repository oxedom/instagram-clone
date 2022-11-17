import PostButtons from "../PostButtons/PostButtons";

const Post = (props) => {

    const {url, text, uid, likes} = props.props
    const temp = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const fetchUser = (id) => 
    {

    } 
    return ( <div className="flex flex-col shadow-md border-solid mt-3 ">
        
        <div className="bg-white p-4 rounded-lg"> 
 
        <div className="flex">
   
        <img className="rounded-full aspect-square w-20 h-20 " alt='profile picture of user' src={temp} />
        <p className="self-end"> {uid} </p> 
        </div>
    
    
        </div>
        <img className="object-fit w-96 md:w-96 " alt={text }src={url} /> 
        <PostButtons props={{likes, uid, text}}> </PostButtons>
        
    </div >  );
}
 
export default Post;