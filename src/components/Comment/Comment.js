import { Link } from "react-router-dom";
const Comment = (props) => {

    const {text, username, date} = props.props


    return ( <div className="ml-2  flex gap-2">
        <Link to={`/profile/${username}`}>
        <span className="font-semibold"> {username} </span>

        </Link>

        <div className="flex-grow-1 flex">
            <p> {text} </p>
        </div>
    </div> );
}
 
export default Comment;