import PostButtons from "../PostButtons/PostButtons";

const Post = (props) => {

    const {url, text, uid, likes} = props.props

    const fetchUser = (id) => 
    {

    } 
    return ( <div className="bg-blue" >
   
        <img className="" alt={text }src={url} /> 
        <PostButtons props={{likes, uid}}> </PostButtons>
        
    </div>  );
}
 
export default Post;