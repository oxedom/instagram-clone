import { Link } from "react-router-dom";


const SquarePhoto = (props) => {

    const { imgUrl, postID} = props

    return ( <div className="m-0.5">
        <Link to={`/post/${postID}`}>
        {/* // eslint-disable-next-line */}
        <img className="aspect-square object-cover" alt='' src={imgUrl}/>
        </Link>
     
    </div>);
}
 
export default SquarePhoto;